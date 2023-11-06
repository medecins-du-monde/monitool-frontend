import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Form } from 'src/app/models/classes/form.model';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService } from 'src/app/services/download.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportingService } from 'src/app/services/reporting.service';
import { ConfirmExportComponent } from './confirm-export/confirm-export.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit, OnDestroy {

  @ViewChild('dlMinimized') dlMinimized: TemplateRef<any>;

  dimensionForm: FormGroup;
  @Input() isCrossCuttingReport = false;
  @Input() project: Project;
  @Output() dimensionEvent: EventEmitter<string> = new EventEmitter<string>();

  groupOptions: { value: string; viewValue: string; }[];

  private subscription: Subscription = new Subscription();

  win;

  forms: Form[] = [];
  periodicitiesList = [
    'free',
    'day',
    'month_week_sat',
    'month_week_sun',
    'month_week_mon',
    'week_sat',
    'week_sun',
    'week_mon',
    'month',
    'quarter',
    'semester',
    'year',
    'entity',
    'group'
  ];

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private downloadService: DownloadService,
    private router: Router,
    private route: ActivatedRoute,
    private reportingService: ReportingService,
    private dialog: MatDialog
  ) {}


  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }


  get currentPeriodicity(): string {
    const period = this.dimensionForm.get('dimensionId').value;
    if (period === 'entity' || period === 'group') {
      return 'month';
    }
    return period;
  }

  get currentProjectId(): string {
    return this.project.id;
  }

  get minimized(): boolean {
    return true;
  }

  ngOnInit(): void {
    this.updateDimension(8, this.periodicitiesList);
    this.groupOptions = [];
    // If the page is not the cross
    if (!this.isCrossCuttingReport) {
      this.subscription.add(
        this.projectService.openedProject.subscribe((project: Project) => {
          this.project = project;
          this.forms = project.forms;
          let smallestIndex = this.periodicitiesList.length;
          const newOptionsList = [];
          for (const form of this.project.forms) {
            const index = this.periodicitiesList.indexOf(form.periodicity);
            if (index !== -1) {
              smallestIndex = index < smallestIndex ? index : smallestIndex;
            }
          }
          const limitInf = smallestIndex === 0 ? 1 : smallestIndex;
          for (let i = limitInf; i < this.periodicitiesList.length; i++) {
            if (this.periodicitiesList[i]) {
              newOptionsList.push({
                value: this.periodicitiesList[i],
                viewValue: `Filter.${this.periodicitiesList[i]}`,
              });
            }
          }
          this.groupOptions = newOptionsList;
          this.updateDimension(smallestIndex, this.periodicitiesList);
        })
      );
    }
    // This part is only of the cross cutting report, it may change later because we don t have many options
    else {
      this.groupOptions = this.groupOptions.concat(
        [
          { value: 'month', viewValue: 'Filter.month' },
          { value: 'quarter', viewValue: 'Filter.quarter' },
          { value: 'semester', viewValue: 'Filter.semester' },
          { value: 'year', viewValue: 'Filter.year' }
        ]
      );
      this.updateDimension(8, this.periodicitiesList);
    }
  }

  /* This method will update the dimension in the parents component
     first with a default value and then with then with the dimension selected by the user
  */
  private updateDimension(index: number, periodicitiesList: string[]): void {
    if (index > 8 && periodicitiesList[index]) {
      this.dimensionForm = this.fb.group({
        dimensionId: periodicitiesList[index]
      });
      this.dimensionEvent.emit(periodicitiesList[index]);
    }
    else {
      this.dimensionForm = this.fb.group({
        dimensionId: 'month'
      });
      this.dimensionEvent.emit('month');
    }
    this.subscription.add(
      this.dimensionForm.get('dimensionId').valueChanges.subscribe(value => {
        this.dimensionEvent.emit(value);
      })
    );
  }

  downloadExcelSheet(): void {
    const dialogRef = this.dialog.open(ConfirmExportComponent, {
      data: {
        title: this.translateService.instant('export-complete'),
        type: 'detailed',
        estimated: this.getEstimatedExportTime(this.project.logicalFrames.length, this.project.entities.length)
      }
    });

    const dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const url = 'api_export_' + this.currentProjectId + '_' + this.currentPeriodicity + '_' + this.currentLang + '_';

        window.open(this.router.url + '/download/' + url, '_blank');
        dialogSubscription.unsubscribe();
      }
    });
  }

  dlMini(): void {
    const dialogRef = this.dialog.open(ConfirmExportComponent, {
      data: {
        title: this.translateService.instant('export-minimized'),
        type: 'global',
        estimated: this.getEstimatedExportTime(this.project.logicalFrames.length)
      }
    });

    const dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const url =
          'api_export_' +
          this.currentProjectId +
          '_' +
          this.currentPeriodicity +
          '_' +
          this.currentLang +
          '_' +
          this.minimized;

        window.open(this.router.url + '/download/' + url, '_blank');
        dialogSubscription.unsubscribe();
      }
    });
  }

  /** Downloads the current view of the table */
  async dlCurrView(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmExportComponent, {
      data: {
        title: this.translateService.instant('export-current-minimized'),
        type: 'current-view'
      }
    });

    const dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // save the current table html to the localStorage,
        // so it can be accessed from the new tab
        const tableID = this.reportingService.saveCurrentTableView();
        window.open(this.router.url + '/download/' + 'export_current_view/' + tableID, '_blank');
        dialogSubscription.unsubscribe();
      }
    });
  }

  /**
   * We estimate that each logFrame will take 10 seconds to be processed,
   * multiplying that for the number of collection sites in the detailed view
   *
   * @param logFrames Number of logical frames
   * @param colSites Number of Collection sites
   * @returns Estimated time in minutes
   */
  private getEstimatedExportTime(logFrames: number, colSites?: number) {
    let time = logFrames * 10;
    if (colSites) {
      time *= colSites;
    }
    time /= 60;
    if (time <= 10) {
      return time;
    } else {
      return Math.ceil(time / 5) * 5;
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
