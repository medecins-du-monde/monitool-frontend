import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partition } from 'src/app/models/classes/partition.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { InfoRow } from '../reporting-table/reporting-table.component';

export interface AddedIndicators {
  indicator: InfoRow;
  disaggregatedIndicators?: ProjectIndicator[];
  splitBySites?: boolean;
  splitByTime?: string;
}

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
  @Output() addIndicatorsEvent: EventEmitter<AddedIndicators> = new EventEmitter<AddedIndicators>();
  @Output() collapseIndicatorsEvent: EventEmitter<{indicator: InfoRow}> = new EventEmitter<{indicator: InfoRow}>();

  private subscription: Subscription = new Subscription();
  project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.open = this.indicator.open;
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.createOptions();
      })
    );
  }

  createOptions(): void {
    this.options = [];
    const numberOfParameters = Object.entries(this.indicator.computation.parameters).length;

    if (numberOfParameters > 1){
      this.options.push({
        value: 'Computation',
        action: this.computationOption
      });
    }

    if (this.dimensionName !== 'entity' && this.dimensionName !== 'group' && !this.indicator.customFilter){
      this.options.push({
        value: 'Collection Sites',
        action: this.collectionSitesOption
      });
    }

    if ((this.dimensionName === 'entity' || this.dimensionName === 'group')){
      if (!this.indicator.customFilter?.month){
        this.options.push({
          value: 'Months',
          action: () => this.timeOption('month')
        });

        if (!this.indicator.customFilter?.quarter){
          this.options.push({
            value: 'Quarters',
            action: () => this.timeOption('quarter')
          });

          if (!this.indicator.customFilter?.semester){
            this.options.push({
              value: 'Semesters',
              action: () => this.timeOption('semester')
            });

            if (!this.indicator.customFilter?.year){
              this.options.push({
                value: 'Years',
                action: () => this.timeOption('year')
              });
            }
          }
        }
      }
    }

    if (numberOfParameters === 1){
      const parameterValue: any = Object.entries(this.indicator.computation.parameters)[0][1];

      let element;

      let found = false;
      for (const f of this.project.forms) {
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
        if (parameterValue.filter &&
           (!(partition.id in parameterValue.filter) ||
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

  partitionOption = (partition: Partition): void => {
    this.open = !this.open;

    const disaggregatedIndicators = [];
    let newComputation;

    for (const partitionElement of partition.elements){
      // clones the computation
      newComputation = JSON.parse(JSON.stringify(this.indicator.computation));

      const parameterValue: any = Object.values(newComputation.parameters)[0];

      if (parameterValue.filter) {
        parameterValue.filter[partition.id] = [partitionElement.id];
      }

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: partitionElement.name,
        baseline: 0,
        target: 0
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

    for (const [parameter, value] of Object.entries(this.indicator.computation.parameters)){
      newComputation = {
        formula: parameter,
        parameters: {}
      };
      newComputation.parameters[parameter] = value;

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: parameter,
        baseline: 0,
        target: 0
      }));
    }
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators
      }
    );
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
