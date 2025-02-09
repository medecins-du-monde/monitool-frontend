/* eslint-disable @typescript-eslint/dot-notation */
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { InfoRow } from 'src/app/models/interfaces/report/rows/info-row.model';
import { AddedIndicators } from 'src/app/models/interfaces/report/added-indicators.model';
import { TimeSlotOrder } from 'src/app/utils/time-slot-periodicity';

@Component({
  selector: 'app-reporting-menu',
  templateUrl: './reporting-menu.component.html',
  styleUrls: ['./reporting-menu.component.scss']
})
export class ReportingMenuComponent implements OnInit, OnDestroy {

  @Input() indicator: InfoRow;
  @Input() dimensionName: string;
  options: any[];
  open: boolean;
  hasEntities = true;
  @Input() isCrossCuttingReport = false;
  @Output() addIndicatorsEvent: EventEmitter<AddedIndicators> = new EventEmitter<AddedIndicators>();
  @Output() collapseIndicatorsEvent: EventEmitter<{indicator: InfoRow}> = new EventEmitter<{indicator: InfoRow}>();

  private subscription: Subscription = new Subscription();
  project: Project;

  constructor(
    private projectService: ProjectService,
    private translateService: TranslateService
    ) { }

  ngOnInit(): void {
    this.open = this.indicator.open;
    this.subscription.add(
      this.translateService.onLangChange.subscribe(() => {
        this.createOptions();
      })
    );
    if (!this.isCrossCuttingReport) {
      this.subscription.add(
        this.projectService.openedProject.subscribe((project: Project) => {
          this.project = project;
          this.createOptions();
          if (!this.project.entities.length) {
            this.hasEntities = false;
          }
        })
      );
    }
    else {
      this.createOptions();
    }
  }

  createOptions(): void {
    this.options = [];
    const numberOfParameters = this.indicator.computation ? Object.entries(this.indicator.computation.parameters).length : 0;
    const currentProject = this.indicator.originProject ? this.indicator.originProject : this.project;
    if (numberOfParameters > 1){
      this.options.push({
        value: `${this.translateService.instant('Computation')}`,
        action: this.computationOption
      });
    }

    // Always include the collection site groups option if the current project has groups
    // and isn't already disaggregated by groups
    if (
      this.dimensionName !== 'entity' &&
      this.dimensionName !== 'group' &&
      !this.indicator.customFilter &&
      currentProject.groups.length > 0
    ) {
      this.options.push({
        value: `${this.translateService.instant('CollectionSiteGroups')}`,
        action: this.collectionSiteGroupsOption
      });
    }

    /* We always put the collection site option if the current project has entities
       and we didn't already choose the collection sites or groups filter */
    if (this.dimensionName !== 'entity'
        && this.dimensionName !== 'group'
        && (!this.indicator.customFilter || this.indicator.disaggregatedByGroup > 0)
        && currentProject.entities.length > 0){
      this.options.push({
        value: `${this.translateService.instant('CollectionSites')}`,
        action: this.collectionSitesOption
      });
    }

    // the periodicity that represents the row is the biggest periodicity of all the datasources that
    // constitute the parameters to the computation
    let highestPeriodicity = 'day';

    for (const value of Object.values(this.indicator.computation.parameters)) {
      const varId = value['elementId'];
      currentProject.forms.forEach(form => {
        if (form.elements.find(element => element.id === varId)) {
          if (TimeSlotOrder[form.periodicity] > TimeSlotOrder[highestPeriodicity]) {
            highestPeriodicity = form.periodicity;
          }
        }
      });
    }

    // This part is managing the options that we put when we select the entity or group filter
    if ((this.dimensionName === 'entity' || this.dimensionName === 'group')){
      if (!this.indicator.customFilter?.month && TimeSlotOrder[highestPeriodicity] <= TimeSlotOrder['month']){
        this.options.push({
          value: `${this.translateService.instant('Filter.month')}`,
          action: () => this.timeOption('month')
        });
      }

      if (!this.indicator.customFilter?.quarter && TimeSlotOrder[highestPeriodicity] <= TimeSlotOrder['quarter']){
        this.options.push({
          value: `${this.translateService.instant('Filter.quarter')}`,
          action: () => this.timeOption('quarter')
        });
      }

      if (!this.indicator.customFilter?.semester && TimeSlotOrder[highestPeriodicity] <= TimeSlotOrder['semester']){
        this.options.push({
          value: `${this.translateService.instant('Filter.semester')}`,
          action: () => this.timeOption('semester')
        });
      }

      if (!this.indicator.customFilter?.year && TimeSlotOrder[highestPeriodicity] <= TimeSlotOrder['year']){
        this.options.push({
          value: `${this.translateService.instant('Filter.year')}`,
          action: () => this.timeOption('year')
        });
      }
    }

    if (numberOfParameters === 1){
      const parameterValue: any = this.indicator.computation ? Object.entries(this.indicator.computation.parameters)[0][1] : null;

      if (parameterValue) {
        let element;

        let found = false;
        for (const f of currentProject.forms) {
          for (const e of f.elements) {
            if (parameterValue.elementId === e.id) {
              element = e;
              found = true;
              break;
            }
          }
          if (found){
            break;
          }
        }

        for (const partition of element.partitions) {

          // Search if the partition containes any of the opened groups, so we still show that partition
          let isInGroup = false;
          if (parameterValue.openGroups) {
            isInGroup = Object.keys(parameterValue.openGroups).includes(partition.id);
          }

          if (parameterValue.filter &&
             (!(partition.id in parameterValue.filter && !isInGroup) ||
               parameterValue.filter[partition.id]?.length === partition.elements?.length)){

            this.options.push({
              value: partition.name,
              action: this.partitionOption,
              partition
            });
          }
        }
      }

    }
  }

  partitionOption = (partition: Partition): void => {
    this.open = !this.open;

    const disaggregatedIndicators = [];
    let newComputation;

    for (const partitionElement of partition.elements) {
      // clones the computation
      newComputation = JSON.parse(JSON.stringify(this.indicator.computation));

      const parameterValue: any = Object.values(newComputation.parameters)[0];

      // Prevents showing elements outside a group
      let elementInGroup = true;
      if (parameterValue.openGroups && parameterValue.openGroups[partition.id]) {
        for (const groupId of parameterValue.openGroups[partition.id]) {
          const group = partition.groups.find(g => g.id === groupId);
          if (group && group.members.findIndex(member => member.id === partitionElement.id) < 0) {
            elementInGroup = false;
            break;
          }
        }
      }
      if (!elementInGroup) {
        continue;
      }

      if (parameterValue.filter) {
        parameterValue.filter[partition.id] = [partitionElement.id];
      }

      // Prevents showing the same partition on non-group elements
      if (parameterValue.openGroups && parameterValue.openGroups[partition.id]) {
        delete parameterValue.openGroups[partition.id];
      }

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: partitionElement.name,
        baseline: 0,
        target: 0 ,
        originProject: this.indicator.originProject ? this.indicator.originProject : undefined,
        partitionedBy: {[partition.id]: partitionElement.id},
      }));
    }
    for (const partitionGroup of partition.groups) {
      // clones the computation
      newComputation = JSON.parse(JSON.stringify(this.indicator.computation));

      const parameterValue: any = Object.values(newComputation.parameters)[0];

      // Skips the group if it's already opened
      if (
        parameterValue.openGroups &&
        parameterValue.openGroups[partition.id] &&
        parameterValue.openGroups[partition.id].includes(partitionGroup.id)
      ) {
        continue;
      }

      if (parameterValue.filter) {
        parameterValue.filter[partition.id] = partitionGroup.members.map(member => member.id);
        if (!parameterValue.openGroups) { parameterValue.openGroups = {}; }
        if (!parameterValue.openGroups[partition.id]) { parameterValue.openGroups[partition.id] = []; }
        parameterValue.openGroups[partition.id].push(partitionGroup.id);
      }

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: partitionGroup.name,
        baseline: 0,
        target: 0 ,
        originProject: this.indicator.originProject ? this.indicator.originProject : undefined,
        partitionedBy: {[partition.id]: partitionGroup.id},
        isGroup: true,
      }));
    }
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators
      }
    );
  }

  computationOption =  (): void  => {
    this.open = !this.open;
    const disaggregatedIndicators = [];
    let newComputation;

    if (this.indicator.computation) {
      for (const [parameter, value] of Object.entries(this.indicator.computation.parameters)){
        newComputation = {
          formula: parameter,
          parameters: {}
        };
        newComputation.parameters[parameter] = value;

        // Looking now for for the name of the variable in order to have the full name of the computation
        let currentProject: Project;
        let originElement: FormElement;
        if (this.project){
          currentProject = this.project;
        } else if (this.indicator.originProject){
          currentProject = this.indicator.originProject;
        }

        let fullName = parameter;

        for (const form of currentProject.forms){
          originElement = form.elements.find((e: FormElement) => e.id === value['elementId']);
          if (originElement !== undefined){
            break;
          }
        }

        if (originElement){
          fullName = parameter + ` (${originElement.name})`;
        }

        disaggregatedIndicators.push(new ProjectIndicator({
          computation: newComputation,
          display: fullName,
          baseline: 0,
          target: 0,
          originProject: this.indicator.originProject,
          partitionedBy: { parameter }
        }));
      }
      this.addIndicatorsEvent.emit(
        {
          indicator: this.indicator,
          disaggregatedIndicators
        }
      );
    }

  }

  collectionSitesOption = (): void => {
    this.open = !this.open;
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators: [],
        splitBySites: true
      } as AddedIndicators
    );
  }

  collectionSiteGroupsOption = (): void => {
    this.open = !this.open;
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators: [],
        splitBySiteGroups: true
      } as AddedIndicators
    );
  }

  timeOption = (time: string): void => {
    this.open = !this.open;
    this.addIndicatorsEvent.emit({
      indicator: this.indicator,
      disaggregatedIndicators: [],
      splitByTime: time
    });
  }

  closeIndicator = (): void => {
    this.open = !this.open;
    this.collapseIndicatorsEvent.emit({
      indicator: this.indicator
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
