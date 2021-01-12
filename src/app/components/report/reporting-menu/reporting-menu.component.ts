import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-reporting-menu',
  templateUrl: './reporting-menu.component.html',
  styleUrls: ['./reporting-menu.component.scss']
})
export class ReportingMenuComponent implements OnInit, OnDestroy {

  @Input() indicator;

  options: any[];
  open: boolean;
  @Output() addIndicatorsEvent: EventEmitter<any> = new EventEmitter<any[]>();
  @Output() collapseIndicatorsEvent: EventEmitter<any> = new EventEmitter<any[]>();

  private subscription: Subscription = new Subscription();
  project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.open = this.indicator.open;
    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;
        this.createOptions()
      })
    );
  }

  createOptions() {
    this.options = [];
    const numberOfParameters = Object.entries(this.indicator.computation.parameters).length;

    let currentProject = this.project;

    if (this.indicator.originProject){
      currentProject = this.indicator.originProject;
    }

    if (numberOfParameters === 1){
      const parameterValue: any = Object.entries(this.indicator.computation.parameters)[0][1];
      let element = undefined;

      let found = false;
      for (const f of currentProject.forms){
        for (const e of f.elements){
          if (parameterValue.elementId === e.id){
            element = e;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      

      for (const partition of element.partitions){
        if (parameterValue.filter &&
           (!(partition.id in parameterValue.filter) ||
             parameterValue.filter[partition.id]?.length === partition.elements?.length)){

          this.options.push({
            value: partition.name,
            action: this.partitionOption,
            partition: partition
          });
        }
      }
    }

    if (numberOfParameters > 1){ 
      this.options.push({
        value: 'Computation',
        action: this.computationOption
      })
    }
  }

  partitionOption = (partition) => {
    this.open = !this.open;

    const disaggregatedIndicators = [];
    let newComputation;
    
    for (const partitionElement of partition.elements){
      //clones the computation
      newComputation = JSON.parse(JSON.stringify(this.indicator.computation));

      const parameterValue = Object.values(newComputation.parameters)[0];
      parameterValue['filter'][partition.id] = [partitionElement.id];

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: partitionElement.name,
        baseline: 0,
        target: 0 ,
        originProject: this.indicator.originProject ? this.indicator.originProject : undefined,
      }))
    }

    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators
      }
    );
  }

  computationOption =  () => {
    this.open = !this.open;
    const disaggregatedIndicators = [];
    let newComputation;

    for(const [parameter, value] of Object.entries(this.indicator.computation.parameters)){
      newComputation = {
        formula: parameter,
        parameters: {}
      }
      newComputation.parameters[parameter] = value;

      disaggregatedIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: parameter,
        baseline: 0,
        target: 0     
      }))
    }
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        disaggregatedIndicators
      }
    );
  }

  closeIndicator = () =>{
    this.open = !this.open;
    this.collapseIndicatorsEvent.emit({
      indicator: this.indicator
    })
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
