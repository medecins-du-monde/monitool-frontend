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
  open: boolean = true;
  @Output() addIndicatorsEvent: EventEmitter<object> = new EventEmitter<any[]>();
  @Output() collapseIndicatorsEvent: EventEmitter<object> = new EventEmitter<any[]>();

  private subscription: Subscription = new Subscription();
  project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
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
    
    if (numberOfParameters === 1){
      let parameterName, parameterValue;
      [parameterName, parameterValue] = Object.entries(this.indicator.computation.parameters)[0];

      let element = undefined;

      let found = false;
      for (const f of this.project.forms){
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

    const newIndicators = [];
    let newComputation;
    
    for (const partitionElement of partition.elements){
      //clones the computation
      newComputation = JSON.parse(JSON.stringify(this.indicator.computation));

      let parameterValue = Object.values(newComputation.parameters)[0];
      parameterValue['filter'][partition.id] = [partitionElement.id];

      newIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: partitionElement.name,
        baseline: 0,
        target: 0  
      }))
    }

    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        newIndicators
      }
    );
  }

  computationOption =  () => {
    this.open = !this.open;
    const newIndicators = [];
    let newComputation;

    for(const [parameter, value] of Object.entries(this.indicator.computation.parameters)){
      newComputation = {
        formula: parameter,
        parameters: {}
      }
      newComputation.parameters[parameter] = value;

      newIndicators.push(new ProjectIndicator({
        computation: newComputation,
        display: parameter,
        baseline: 0,
        target: 0     
      }))
    }
    this.addIndicatorsEvent.emit(
      {
        indicator: this.indicator,
        newIndicators
      }
    );
  }

  closeIndicator = () =>{
    this.open = !this.open;
    this.collapseIndicatorsEvent.emit({
      test: 'test collapsing'
    })
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
