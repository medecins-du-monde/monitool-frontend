import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DataImportService, SitePreview } from 'src/app/services/data-import.service';
import { MultiSiteImportModalComponent } from './multi-site-import-modal.component';
import { MultiSiteImportModalModule } from './multi-site-import-modal.module';

const ok = (existing: any, incoming: any, extra: Partial<SitePreview> = {}): SitePreview => ({
  status: 'ok', existing, incoming, rev: existing ? '1-a' : null, blocked: false, blank: false, structureHash: 'hash', ...extra
});

describe('MultiSiteImportModalComponent', () => {
  let component: MultiSiteImportModalComponent;
  let fixture: ComponentFixture<MultiSiteImportModalComponent>;
  let service: jasmine.SpyObj<DataImportService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<MultiSiteImportModalComponent>>;
  let previews: { [siteId: string]: SitePreview | Error };

  const setup = (isOwner = true, locked: string[] = []) => {
    component = TestBed.createComponent(MultiSiteImportModalComponent).componentInstance;
    component.data.isOwner = isOwner;
    component.data.sites = ['A', 'B', 'C'].map(id => ({ id, name: 'Site ' + id, locked: locked.includes(id) }));
    component.siteRows = component.data.sites.map(site => ({ ...site, selected: false, sheet: null }));
    return component;
  };

  const pickFile = async () => {
    await component.onFileChange({ target: { files: [new Blob()], value: 'x' } });
  };

  const confirmDialog = (confirm: boolean) => dialog.open.and.returnValue({ afterClosed: () => of({ confirm }) } as any);

  beforeEach(() => {
    previews = {};
    service = jasmine.createSpyObj('DataImportService', ['readWorkbook', 'previewSite', 'commitSites']);
    service.readWorkbook.and.resolveTo(['Site A', 'Site B', 'Site C'].map(name => ({ name, data: [[name]] })));
    service.previewSite.and.callFake(async (_project, _form, _period, siteId) => {
      if (previews[siteId] instanceof Error) {
        throw previews[siteId];
      }
      return previews[siteId] as SitePreview;
    });
    service.commitSites.and.resolveTo({ results: [] });
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [MultiSiteImportModalModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        { provide: DataImportService, useValue: service },
        { provide: MatDialog, useValue: dialog },
        { provide: MatDialogRef, useValue: dialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            projectId: 'project:1', formId: 'form', period: '2026-03', periodLabel: 'March', isOwner: true,
            elements: [{ id: 'v', name: 'V', distribution: 0, partitions: [] }], sites: []
          }
        }
      ]
    });
  });

  describe('site selection', () => {
    it('suggests sheets and selects the sites which match', async () => {
      setup();
      await pickFile();
      expect(component.siteRows.map(row => row.sheet)).toEqual(['Site A', 'Site B', 'Site C']);
      expect(component.selectedRows.length).toBe(3);
      expect(component.canValidate).toBeTrue();
    });

    it('allows importing one site, some or all, but not none', async () => {
      setup();
      await pickFile();
      component.toggleAll(false);
      expect(component.canValidate).toBeFalse();

      component.siteRows[1].selected = true;
      expect(component.canValidate).toBeTrue();

      previews.B = ok(null, { v: [1] });
      confirmDialog(false);
      await component.validate();
      expect(service.previewSite).toHaveBeenCalledTimes(1);
      expect(service.previewSite.calls.mostRecent().args[3]).toBe('B');
    });

    it('needs a sheet for each selected site', async () => {
      setup();
      await pickFile();
      component.siteRows[0].sheet = null;
      expect(component.canValidate).toBeFalse();
    });

    it('offers a sheet to one site only', async () => {
      setup();
      await pickFile();
      expect(component.isSheetTaken('Site A', component.siteRows[1])).toBeTrue();
      expect(component.isSheetTaken('Site A', component.siteRows[0])).toBeFalse();
    });

    it('never lets two selected sites use the same sheet', async () => {
      setup();
      await pickFile();
      const [a, b] = component.siteRows;

      // Give the sheet of B to A while B is unselected, then select B again.
      b.selected = false;
      a.sheet = 'Site B';
      expect(component.canValidate).toBeTrue();
      b.selected = true;
      expect(component.canValidate).toBeFalse();
      component.onRowToggle(b);

      expect(a.sheet).toBe('Site B');
      expect(b.sheet).toBeNull();
      expect(component.canValidate).toBeFalse();
    });

    it('does not let "select all" bring back a sheet used by another site', async () => {
      setup();
      await pickFile();
      const [a, b] = component.siteRows;
      component.toggleAll(false);
      a.selected = true;
      a.sheet = 'Site B';

      component.toggleAll(true);
      expect(a.sheet).toBe('Site B');
      expect(b.selected).toBeTrue();
      expect(b.sheet).toBeNull();
    });

    it('warns when a sheet has the name of another site', async () => {
      setup();
      await pickFile();
      expect(component.hasNameWarning(component.siteRows[0])).toBeFalse();
      component.siteRows[0].sheet = 'Site B';
      expect(component.hasNameWarning(component.siteRows[0])).toBeTrue();
    });

    it('disables locked sites for non owners only', async () => {
      setup(false, ['A']);
      await pickFile();
      expect(component.siteRows[0].selected).toBeFalse();
      component.toggleAll(true);
      expect(component.siteRows[0].selected).toBeFalse();
      expect(component.siteRows[1].selected).toBeTrue();

      setup(true, ['A']);
      await pickFile();
      expect(component.siteRows[0].selected).toBeTrue();
    });

    it('can pick the same file again, once corrected', async () => {
      setup();
      const target = { files: [new Blob()], value: 'file.xlsx' };
      await component.onFileChange({ target });
      expect(target.value).toBe('');
    });

    it('shows file errors', async () => {
      setup();
      service.readWorkbook.and.rejectWith({ key: 'import.error.duplicate-sheets' });
      await pickFile();
      expect(component.fileError).toBe('import.error.duplicate-sheets');
    });
  });

  describe('validation', () => {
    beforeEach(async () => {
      setup();
      await pickFile();
    });

    it('stops on errors, grouped by site, and writes nothing', async () => {
      previews.A = ok(null, { v: [1] });
      previews.B = { status: 'invalid', errors: [
        { key: 'import.error.bad-header', extra: { element: 'Cases' } },
        { key: 'import.error.not-whole-number', extra: { element: 'Age' } },
        { key: 'import.error.not-whole-number', extra: { element: 'Cases' } }
      ] };
      previews.C = { status: 'invalid', errors: [{ key: 'import.error.content-outside-table', extra: { row: 9 } }] };
      await component.validate();
      expect(component.step).toBe('select');
      expect(component.siteRows[0].errors).toBeUndefined();
      expect(component.siteRows[1].errors).toEqual({
        site: undefined,
        messages: [],
        tables: [
          { name: 'Cases', messages: ['import.error.bad-header', 'import.error.not-whole-number'] },
          { name: 'Age', messages: ['import.error.not-whole-number'] }
        ]
      });
      expect(component.siteRows[2].errors).toEqual({ site: undefined, messages: ['import.error.content-outside-table'], tables: [] });
      expect(service.commitSites).not.toHaveBeenCalled();
      expect(dialog.open).not.toHaveBeenCalled();
    });

    it('can go on once the site in error is unselected', async () => {
      previews.A = ok(null, { v: [1] });
      previews.B = { status: 'invalid', errors: [{ key: 'import.error.no-table' }] };
      previews.C = ok(null, { v: [2] });
      await component.validate();
      expect(component.siteRows[1].errors).toBeDefined();

      component.siteRows[1].selected = false;
      confirmDialog(true);
      await component.validate();
      expect(component.siteRows[1].errors).toBeUndefined();
      expect(dialog.open).toHaveBeenCalled();
    });

    it('stops if the data source changed during validation', async () => {
      previews.A = ok(null, { v: [1] });
      previews.B = ok(null, { v: [1] }, { structureHash: 'other' });
      previews.C = ok(null, { v: [1] });
      await component.validate();
      expect(component.step).toBe('select');
      expect(component.generalError.messages).toEqual(['import.multi.structure-changed']);
    });

    it('clears the errors of a site when another sheet is chosen for it', async () => {
      previews.A = { status: 'invalid', errors: [{ key: 'import.error.no-table', extra: { element: 'V' } }] };
      previews.B = { status: 'invalid', errors: [{ key: 'import.error.no-table', extra: { element: 'V' } }] };
      previews.C = ok(null, { v: [1] });
      await component.validate();

      component.onSheetChange(component.siteRows[0]);
      expect(component.siteRows[0].errors).toBeUndefined();
      expect(component.siteRows[1].errors).toBeDefined();
    });

    it('clears all errors with a new file', async () => {
      previews.A = { status: 'invalid', errors: [{ key: 'import.error.no-table', extra: { element: 'V' } }] };
      previews.B = ok(null, { v: [1] });
      previews.C = ok(null, { v: [1] });
      await component.validate();
      await pickFile();
      expect(component.siteRows[0].errors).toBeUndefined();
    });

    it('with no existing data, only asks for a confirmation', async () => {
      previews.A = ok(null, { v: [1] });
      previews.B = ok(null, { v: [2] });
      previews.C = ok({ v: [null] }, { v: [3] });
      confirmDialog(true);
      await component.validate();
      await Promise.resolve();
      expect(dialog.open).toHaveBeenCalledTimes(1);
      const data = dialog.open.calls.mostRecent().args[1].data as any;
      expect(data.messageId).toBe('import.multi.confirm-new');
      expect(data.messageParams).toEqual({ sites: 3, added: 3, replaced: 0, cleared: 0 });
      expect(service.commitSites.calls.mostRecent().args[4].map(site => site.siteId)).toEqual(['A', 'B', 'C']);
    });

    it('with no existing data, cancelling the confirmation writes nothing', async () => {
      previews.A = ok(null, { v: [1] });
      previews.B = ok(null, { v: [2] });
      previews.C = ok(null, { v: [3] });
      confirmDialog(false);
      await component.validate();
      expect(service.commitSites).not.toHaveBeenCalled();
      expect(component.step).toBe('select');
    });

    it('imports nothing from blank sheets of sites with no data', async () => {
      previews.A = ok(null, { v: [null] }, { blank: true });
      previews.B = ok(null, { v: [null] }, { blank: true });
      previews.C = ok(null, { v: [null] }, { blank: true });
      await component.validate();
      expect(dialog.open).not.toHaveBeenCalled();
      expect(component.generalError.messages).toEqual(['import.multi.nothing-to-import']);
    });
  });

  describe('preview', () => {
    beforeEach(async () => {
      setup();
      await pickFile();
      previews.A = ok({ v: [1] }, { v: [2] });              // different
      previews.B = ok(null, { v: [3] });                     // new site
      previews.C = ok({ v: [4] }, { v: [null] }, { blank: true }); // blank sheet
      await component.validate();
    });

    const result = (id: string) => component.results.find(r => r.id === id);

    it('shows a comparison when a site has existing data', () => {
      expect(component.step).toBe('preview');
      expect(dialog.open).not.toHaveBeenCalled();
      expect(result('A').counts.replaced).toBe(1);
      expect(result('C').counts.cleared).toBe(1);
    });

    it('needs a decision on sites with data, before going on', () => {
      expect(result('A').needsDecision).toBeTrue();
      expect(result('B').needsDecision).toBeFalse();
      expect(component.canContinue).toBeFalse();
      result('A').decision = 'keep';
      expect(component.canContinue).toBeTrue();
    });

    it('needs a decision on sites which would only gain values', async () => {
      setup();
      await pickFile();
      previews.A = ok({ v: [1, null] }, { v: [1, 5] });
      previews.B = ok(null, { v: [1, 5] });
      previews.C = ok(null, { v: [1, 5] });
      await component.validate();
      expect(result('A').needsDecision).toBeTrue();
      expect(result('A').counts).toEqual({ same: 1, added: 1, replaced: 0, cleared: 0 });
      expect(component.canContinue).toBeFalse();
    });

    it('keeps blank sheets on Keep by default, and out of "Replace all"', () => {
      expect(result('C').decision).toBe('keep');
      component.setAll('replace');
      expect(result('A').decision).toBe('replace');
      expect(result('C').decision).toBe('keep');
    });

    it('"Keep all" applies to all sites', () => {
      result('C').decision = 'clear';
      component.setAll('keep');
      expect(result('A').decision).toBe('keep');
      expect(result('C').decision).toBe('keep');
    });

    it('builds the tables of a site only when it is opened', () => {
      expect(result('A').tables).toBeUndefined();
      component.toggleSite(result('A'));
      expect(component.openedSite).toBe(result('A'));
      expect(result('A').tables[0].rows[0].cells[0]).toEqual({ existing: 1, incoming: 2, state: 'different' });
      component.toggleSite(result('A'));
      expect(component.openedSite).toBeUndefined();
    });

    it('explains each cell according to the decision', () => {
      const cell = { existing: 1, incoming: 2, state: 'different' as const };
      const cleared = { existing: 1, incoming: null, state: 'different' as const };
      const added = { existing: null, incoming: 2, state: 'added' as const };
      const r = result('A');
      // Nothing is decided yet: neither outcome can be announced.
      expect(component.cellMeaning(cell, r)).toBe('import.multi.legend-different');
      expect(component.cellMeaning(added, r)).toBe('import.multi.legend-added');
      r.decision = 'keep';
      expect(component.cellMeaning(cell, r)).toBe('import.multi.cell.kept');
      expect(component.cellMeaning(added, r)).toBe('import.multi.cell.not-added');
      r.decision = 'replace';
      expect(component.cellMeaning(cell, r)).toBe('import.multi.cell.replaced');
      expect(component.cellMeaning(cleared, r)).toBe('import.multi.cell.cleared');
      expect(component.cellMeaning(added, r)).toBe('import.multi.cell.added');
    });

    it('leaves kept sites out of the commit', async () => {
      result('A').decision = 'keep';
      confirmDialog(true);
      component.confirmAndCommit();
      await Promise.resolve();
      const sites = service.commitSites.calls.mostRecent().args[4];
      expect(sites).toEqual([{ siteId: 'B', baseRev: null, values: { v: [3] } }]);
    });

    it('sends replaced sites with their revision', async () => {
      result('A').decision = 'replace';
      confirmDialog(true);
      component.confirmAndCommit();
      await Promise.resolve();
      expect((dialog.open.calls.mostRecent().args[1].data as any).messageId).toBe('import.multi.confirm');
      expect(service.commitSites.calls.mostRecent().args).toEqual(['project:1', 'form', '2026-03', 'hash', [
        { siteId: 'A', baseRev: '1-a', values: { v: [2] } },
        { siteId: 'B', baseRev: null, values: { v: [3] } }
      ]]);
    });

    it('asks explicitly for clearing a site', async () => {
      result('A').decision = 'keep';
      result('C').decision = 'clear';
      confirmDialog(true);
      component.confirmAndCommit();
      await Promise.resolve();
      expect((dialog.open.calls.mostRecent().args[1].data as any).messageParams).toEqual({ sites: 2, added: 1, replaced: 0, cleared: 1 });
      expect(service.commitSites.calls.mostRecent().args[4][1]).toEqual({ siteId: 'C', baseRev: '1-a', confirmClear: true, values: { v: [null] } });
    });

    it('writes nothing if the final confirmation is declined', () => {
      result('A').decision = 'replace';
      confirmDialog(false);
      component.confirmAndCommit();
      expect(service.commitSites).not.toHaveBeenCalled();
      expect(component.step).toBe('preview');
    });

    it('writes nothing on cancel', () => {
      component.close();
      expect(service.commitSites).not.toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalledWith({ changed: false });
    });

    it('reports success, and asks the calendar to refresh', fakeAsync(() => {
      result('A').decision = 'replace';
      confirmDialog(true);
      component.confirmAndCommit();
      tick();
      expect(component.step).toBe('done');
      expect(component.written).toBe(2);
      component.close();
      expect(dialogRef.close).toHaveBeenCalledWith({ changed: true });
    }));

    it('reports a failed import, and asks to check the file again', fakeAsync(() => {
      service.commitSites.and.rejectWith({ status: 409, error: { key: 'import.error.conflict', extra: { sites: 'Site A' } } });
      result('A').decision = 'replace';
      confirmDialog(true);
      component.confirmAndCommit();
      tick();
      expect(component.step).toBe('preview');
      expect(component.commitError).toBe('import.error.conflict');
      expect(component.canRevalidate).toBeTrue();
    }));

    it('explains an import too large to be sent', fakeAsync(() => {
      service.commitSites.and.rejectWith({ status: 413 });
      result('A').decision = 'replace';
      confirmDialog(true);
      component.confirmAndCommit();
      tick();
      expect(component.commitError).toBe('import.error.too-large');
    }));
  });

  it('shows the errors of a site below its row, while it is selected', async () => {
    fixture = TestBed.createComponent(MultiSiteImportModalComponent);
    component = fixture.componentInstance;
    component.data.isOwner = true;
    component.data.sites = [{ id: 'A', name: 'Site A', locked: false }, { id: 'B', name: 'Site B', locked: false }];
    component.siteRows = component.data.sites.map(site => ({ ...site, selected: false, sheet: null }));
    fixture.detectChanges();
    await pickFile();
    fixture.detectChanges();

    previews.A = ok(null, { v: [1] });
    previews.B = { status: 'invalid', errors: [{ key: 'import.error.not-whole-number', extra: { element: 'Cases' } }] };
    await component.validate();
    fixture.detectChanges();

    const table = (fixture.nativeElement as HTMLElement).querySelector('.sites-table');
    const siteRows = table.querySelectorAll('tr.site-row');
    expect(table.querySelectorAll('tr.messages-row').length).toBe(1);

    // Right below the row of its site, across the whole width.
    const messages = siteRows[1].nextElementSibling;
    expect(messages.classList).toContain('messages-row');
    expect(messages.querySelector('td').getAttribute('colspan')).toBe('3');
    const errors = messages.querySelector('app-import-errors');
    expect(errors.querySelector('.table-name').textContent).toBe('Cases');
    expect(errors.querySelector('.site')).toBeNull();

    component.siteRows[1].selected = false;
    fixture.detectChanges();
    expect(table.querySelector('app-import-errors')).toBeNull();
  });

  it('warns about a sheet named differently below its site, in a full-width warning box', async () => {
    fixture = TestBed.createComponent(MultiSiteImportModalComponent);
    component = fixture.componentInstance;
    component.data.isOwner = true;
    component.data.sites = [{ id: 'A', name: 'Site A', locked: false }];
    component.siteRows = [{ id: 'A', name: 'Site A', locked: false, selected: false, sheet: null }];
    fixture.detectChanges();
    await pickFile();
    fixture.detectChanges();

    const table = (fixture.nativeElement as HTMLElement).querySelector('.sites-table');
    expect(table.querySelector('.message.warning')).toBeNull();

    component.siteRows[0].sheet = 'Site B';
    fixture.detectChanges();
    const messages = table.querySelector('tr.site-row').nextElementSibling;
    expect(messages.querySelector('td').getAttribute('colspan')).toBe('3');
    const warning = messages.querySelector('.message.warning');
    expect(warning.textContent).toContain('import.multi.name-warning');
    expect(warning.querySelector('mat-icon').textContent).toBe('warning');
  });

  it('renders each step', async () => {
    fixture = TestBed.createComponent(MultiSiteImportModalComponent);
    component = fixture.componentInstance;
    component.data.isOwner = true;
    component.data.sites = [{ id: 'A', name: 'Site A', locked: false }];
    component.siteRows = [{ id: 'A', name: 'Site A', locked: false, selected: false, sheet: null }];
    fixture.detectChanges();

    await pickFile();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sites-table').textContent).toContain('Site A');
    const checkboxes: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.sites-table mat-checkbox'));
    expect(checkboxes.length).toBe(2);
    checkboxes.forEach(checkbox => expect(checkbox.classList).toContain('mat-primary'));

    previews.A = ok({ v: [1] }, { v: [2] });
    await component.validate();
    fixture.detectChanges();
    component.toggleSite(component.results[0]);
    fixture.detectChanges();
    const cell: HTMLElement = fixture.nativeElement.querySelector('.preview-table td');
    expect(cell.classList).toContain('different');
    expect(cell.textContent.replace(/\s+/g, ' ').trim()).toBe('≠ 1 → 2');
  });
});
