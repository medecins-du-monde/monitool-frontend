import { Component, ElementRef, Inject } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { DataImportService, ImportedSheet, SiteCommit, SitePreview } from 'src/app/services/data-import.service';
import {
  buildPreviewTable,
  countChanges,
  hasChanges,
  hasExistingData,
  ImportCellState,
  ImportCounts,
  ImportDecision,
  ImportErrorGroup,
  groupImportErrors,
  ImportPreviewCell,
  ImportPreviewTable,
  matchSheets,
  needsDecision,
  sheetMatchesSite,
  willWrite
} from 'src/app/utils/import-diff';

export interface MultiSiteImportData {
  projectId: string;
  formId: string;
  elements: FormElement[];
  period: string;
  periodLabel: string;
  isOwner: boolean;
  /** Sites the user may see for this period. */
  sites: { id: string; name: string; locked: boolean }[];
}

interface SiteRow {
  id: string;
  name: string;
  locked: boolean;
  selected: boolean;
  sheet: string | null;
  /** What is wrong with the sheet selected for this site. */
  errors?: ImportErrorGroup;
}

interface SiteResult {
  id: string;
  name: string;
  preview: SitePreview;
  counts: ImportCounts;
  hasData: boolean;
  needsDecision: boolean;
  decision: ImportDecision | null;
  /** Filled when the site is first opened: big data sources have thousands of cells. */
  tables?: ImportPreviewTable[];
}

type Step = 'select' | 'validating' | 'preview' | 'saving' | 'done';

@Component({
  selector: 'app-multi-site-import-modal',
  templateUrl: './multi-site-import-modal.component.html',
  styleUrls: ['./multi-site-import-modal.component.scss']
})
export class MultiSiteImportModalComponent {
  public step: Step = 'select';
  public fileName?: string;
  public sheets: ImportedSheet[] = [];
  public siteRows: SiteRow[];
  public fileError?: string;
  /** Errors which don't concern one site in particular. */
  public generalError?: ImportErrorGroup;

  public results: SiteResult[] = [];
  public openedSite?: SiteResult;
  public commitError?: string;
  public canRevalidate = false;
  public written = 0;
  public changed = false;

  private structureHash?: string;

  constructor(
    private dataImportService: DataImportService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private elementRef: ElementRef<HTMLElement>,
    public dialogRef: MatDialogRef<MultiSiteImportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MultiSiteImportData
  ) {
    this.siteRows = data.sites.map(site => ({ ...site, selected: false, sheet: null }));
  }

  public get sheetNames(): string[] {
    return this.sheets.map(sheet => sheet.name);
  }

  public get selectedRows(): SiteRow[] {
    return this.siteRows.filter(row => row.selected);
  }

  public get selectableRows(): SiteRow[] {
    return this.siteRows.filter(row => !this.isRowDisabled(row));
  }

  public get allSelected(): boolean {
    return this.selectableRows.length > 0 && this.selectableRows.every(row => row.selected);
  }

  public get canValidate(): boolean {
    const sheets = this.selectedRows.map(row => row.sheet);
    return sheets.length > 0 && sheets.every(sheet => !!sheet) && new Set(sheets).size === sheets.length;
  }

  public get canContinue(): boolean {
    return this.results.some(result => this.writes(result)) && this.results.every(result => !result.needsDecision || !!result.decision);
  }

  public get hasBlankSites(): boolean {
    return this.results.some(result => result.needsDecision && result.preview.blank);
  }

  public isRowDisabled(row: SiteRow): boolean {
    return row.locked && !this.data.isOwner;
  }

  public isSheetTaken(sheetName: string, row: SiteRow): boolean {
    return this.siteRows.some(other => other !== row && other.selected && other.sheet === sheetName);
  }

  public hasNameWarning(row: SiteRow): boolean {
    return row.selected && !!row.sheet && !sheetMatchesSite(row.sheet, row.name);
  }

  public toggleAll(selected: boolean): void {
    this.selectableRows.forEach(row => {
      row.selected = selected;
      this.onRowToggle(row);
    });
  }

  /** A sheet given to another site while this one was unselected is not this site's anymore: writing it here would mix up sites. */
  public onRowToggle(row: SiteRow): void {
    if (row.selected && row.sheet && this.isSheetTaken(row.sheet, row)) {
      row.sheet = null;
      row.errors = undefined;
    }
  }

  public onSheetChange(row: SiteRow): void {
    if (!this.isRowDisabled(row)) {
      row.selected = !!row.sheet;
    }
    row.errors = undefined;
    this.generalError = undefined;
  }

  public async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    // Allows picking the same file again once it has been corrected.
    event.target.value = '';
    if (!file) {
      return;
    }

    this.fileName = file.name;
    this.fileError = undefined;
    this.generalError = undefined;
    this.sheets = [];
    this.siteRows.forEach(row => { row.selected = false; row.sheet = null; row.errors = undefined; });

    try {
      this.sheets = await this.dataImportService.readWorkbook(file);
    } catch (error) {
      this.fileError = this.translateService.instant(error && error.key ? error.key : 'import.error.generic');
      return;
    }

    const matches = matchSheets(this.selectableRows, this.sheetNames);
    this.selectableRows.forEach(row => {
      row.sheet = matches[row.id] || null;
      row.selected = !!row.sheet;
    });
  }

  /** Check all selected sheets. Nothing is written. */
  public async validate(): Promise<void> {
    this.step = 'validating';
    this.generalError = undefined;
    this.siteRows.forEach(row => { row.errors = undefined; });
    this.commitError = undefined;
    this.canRevalidate = false;
    this.openedSite = undefined;
    const results: SiteResult[] = [];
    const hashes = new Set<string>();

    for (const row of this.selectedRows) {
      const sheet = this.sheets.find(s => s.name === row.sheet);
      let preview: SitePreview;
      try {
        preview = await this.dataImportService.previewSite(this.data.projectId, this.data.formId, this.data.period, row.id, sheet.data);
      } catch (error) {
        row.errors = { messages: [this.httpErrorMessage(error)], tables: [] };
        continue;
      }

      if (preview.status !== 'ok') {
        row.errors = groupImportErrors(preview.errors, (key, extra) => this.translateService.instant(key, extra));
        continue;
      }

      hashes.add(preview.structureHash);
      results.push(this.toResult(row, preview));
    }

    if (this.selectedRows.some(row => row.errors)) {
      this.step = 'select';
      this.scrollToFirstError();
      return;
    }

    if (hashes.size !== 1) {
      this.generalError = { messages: [this.translateService.instant('import.multi.structure-changed')], tables: [] };
      this.step = 'select';
      return;
    }

    this.structureHash = hashes.values().next().value;
    this.results = results;

    if (results.some(result => hasExistingData(result.preview.existing))) {
      this.step = 'preview';
    } else {
      // Nothing to compare with: only confirm, as nothing in the file tells that sheets are on the right sites.
      this.step = 'select';
      this.confirmAndCommit();
    }
  }

  /** With many sites, the first error may be out of sight: it would look as if nothing happened. */
  private scrollToFirstError(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.sites-table app-import-errors')?.scrollIntoView({ block: 'center' });
    });
  }

  private toResult(row: SiteRow, preview: SitePreview): SiteResult {
    const counts = countChanges(preview.existing, preview.incoming);
    const decisionNeeded = needsDecision(preview.existing, counts);
    return {
      id: row.id,
      name: row.name,
      preview,
      counts,
      hasData: hasExistingData(preview.existing),
      needsDecision: decisionNeeded,
      // A blank sheet is most likely a site nobody filled in: clearing it has to be asked for.
      decision: decisionNeeded && preview.blank ? 'keep' : null
    };
  }

  public writes(result: SiteResult): boolean {
    return willWrite(result.preview.existing, result.counts, result.decision);
  }

  /** Blank sheets are left out: clearing a whole site is only ever done one site at a time. */
  public setAll(decision: 'keep' | 'replace'): void {
    this.results.filter(result => result.needsDecision).forEach(result => {
      if (decision === 'keep' || !result.preview.blank) {
        result.decision = decision;
      }
    });
  }

  public toggleSite(result: SiteResult): void {
    if (this.openedSite === result) {
      this.openedSite = undefined;
      return;
    }
    if (!result.tables) {
      result.tables = this.data.elements.map(element => buildPreviewTable(element, result.preview.existing, result.preview.incoming));
    }
    this.openedSite = result;
  }

  public cellClass(cell: ImportPreviewCell): ImportCellState {
    return cell.state;
  }

  public cellSymbol(cell: ImportPreviewCell): string {
    return { same: '=', added: '+', different: '≠', empty: '' }[cell.state];
  }

  /** What will happen to this cell, given the decision on its site. */
  public cellMeaning(cell: ImportPreviewCell, result: SiteResult): string {
    if (cell.state !== 'empty' && cell.state !== 'same' && result.needsDecision && !result.decision) {
      return this.translateService.instant(cell.state === 'added' ? 'import.multi.legend-added' : 'import.multi.legend-different');
    }

    const writes = this.writes(result);
    let key: string;
    if (cell.state === 'same') {
      key = 'same';
    } else if (cell.state === 'added') {
      key = writes ? 'added' : 'not-added';
    } else if (cell.state === 'different') {
      key = !writes ? 'kept' : (cell.incoming === null ? 'cleared' : 'replaced');
    } else {
      return '';
    }
    return this.translateService.instant('import.multi.cell.' + key);
  }

  public confirmAndCommit(): void {
    const toWrite = this.results.filter(result => this.writes(result));
    if (toWrite.length === 0) {
      this.generalError = { messages: [this.translateService.instant('import.multi.nothing-to-import')], tables: [] };
      return;
    }

    const messageParams = toWrite.reduce(
      (totals, result) => ({
        sites: totals.sites + 1,
        added: totals.added + result.counts.added,
        replaced: totals.replaced + result.counts.replaced,
        cleared: totals.cleared + result.counts.cleared
      }),
      { sites: 0, added: 0, replaced: 0, cleared: 0 }
    );

    // With no existing data anywhere, there was no comparison and no keep or replace decision to mention.
    const messageId = this.results.some(result => result.hasData) ? 'import.multi.confirm' : 'import.multi.confirm-new';

    this.dialog
      .open(ConfirmModalComponent, { data: { messageId, messageParams, warning: true } })
      .afterClosed()
      .subscribe(res => {
        if (res?.confirm) {
          this.commit(toWrite);
        }
      });
  }

  private async commit(toWrite: SiteResult[]): Promise<void> {
    const previousStep = this.step;
    this.step = 'saving';
    this.commitError = undefined;
    this.canRevalidate = false;

    const sites: SiteCommit[] = toWrite.map(result => {
      const site: SiteCommit = { siteId: result.id, baseRev: result.preview.rev || null, values: result.preview.incoming };
      if (result.decision === 'clear') {
        site.confirmClear = true;
      }
      return site;
    });

    try {
      await this.dataImportService.commitSites(this.data.projectId, this.data.formId, this.data.period, this.structureHash, sites);
      this.written = toWrite.length;
      this.changed = true;
      this.step = 'done';
    } catch (error) {
      this.commitError = this.httpErrorMessage(error);
      // A restore gives documents new revisions, so any retry has to start from the current data.
      this.canRevalidate = error?.status !== 403 && error?.status !== 413;
      // The outcome of a failed import may have to be looked at: the calendar has to be up to date.
      this.changed = true;
      this.step = previousStep === 'preview' ? 'preview' : 'select';
    }
  }

  private httpErrorMessage(error: any): string {
    if (error?.status === 413) {
      return this.translateService.instant('import.error.too-large');
    }
    if (error?.status === 403) {
      return this.translateService.instant('import.error.forbidden');
    }
    if (error?.error?.key) {
      return this.translateService.instant(error.error.key, error.error.extra);
    }
    return this.translateService.instant('import.error.generic');
  }

  public close(): void {
    this.dialogRef.close({ changed: this.changed });
  }

  public hasChanges(result: SiteResult): boolean {
    return hasChanges(result.counts);
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
