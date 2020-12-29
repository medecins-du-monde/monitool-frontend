import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-reporting-menu',
  templateUrl: './reporting-menu.component.html',
  styleUrls: ['./reporting-menu.component.scss']
})
export class ReportingMenuComponent implements OnInit {

  @Input() indicator;

  options: any[];
  
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
            value: partition.name
          });
        }
      }
    }

    if (numberOfParameters > 1){ 
      this.options.push({
        value: 'Computation'
      })
    }
  }

}
