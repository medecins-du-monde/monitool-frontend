import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ChartService } from 'src/app/services/chart.service';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { GroupTitle, SectionTitle } from 'src/app/components/report/reporting-table/reporting-table.component';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private chartService: ChartService ) { }

  protected project: Project;
  grouping = '';

  filter = new BehaviorSubject<any>({});

  dimensionIds = new BehaviorSubject('');

  tableContent = new BehaviorSubject<any[]>([]);


  options =  {fill: false};
  data = {};

  ngOnInit(): void {

    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.buildIndicators();
    });
  }


  buildIndicators() {
    let rows = [];
    let id = 0;

    if (this.project.logicalFrames){
      for (const logicalFrame of this.project.logicalFrames){
        rows.push({
          title: `Logical framework: ${logicalFrame.name}`,
          sectionId: id,
          open: false,
        } as SectionTitle);

        rows.push({
          icon: false,
          groupName: `General objective: ${logicalFrame.goal}`,
          sectionId: id
        } as GroupTitle);

        rows = rows.concat(logicalFrame.indicators);

        for (const purpose of logicalFrame.purposes){
          rows.push({
            icon: false,
            groupName: `Specific objective: ${purpose.description}`,
            sectionId: id
          } as GroupTitle);

          rows = rows.concat(purpose.indicators);

          for (const output of purpose.outputs){
            rows.push({
              icon: false,
              groupName: `Result: ${output.description}`,
              sectionId: id
            } as GroupTitle);
            
            rows = rows.concat(output.indicators);

            for (const activity of output.activities){
              rows.push({
                icon: false,
                groupName: `Activity: ${activity.description}`,
                sectionId: id
              } as GroupTitle);
              
              rows = rows.concat(activity.indicators);
            }
          }
        }
        id += 1;
      }
    }

    if (this.project.crossCutting){
      // TODO: add cross cutting indicators to the table when they work correctly
    }

    if (this.project.extraIndicators){
      rows.push({
        title: 'Extra indicators',
        sectionId: id,
        open: false,
      }as SectionTitle);

      rows = rows.concat(this.project.extraIndicators);
      id += 1;
    }

    if (this.project.forms){
      for (const form of this.project.forms){
        rows.push({
          title: `Data source: ${form.name}`,
          sectionId: id,
          open: false,
        } as SectionTitle);

        for (const element of form.elements){
          const computation =  {
            formula: 'a',
            parameters: {
              a: {
                elementId: element.id,
                filter: {}
              }
            }
          };
          rows.push(new ProjectIndicator({
            display: element.name,
            baseline: 0,
            target: 0,
            colorize: false,
            computation
          }));
        }

        id += 1;
      }
    }
    this.tableContent.next(rows);
  }

  get chartData(){
    return this.chartService.data.value;
  }

  receiveFilter(value){
    this.filter.next(value);
  }

  receiveDimension(value){
    this.dimensionIds.next(value);
    this.grouping = value;
  }

}


