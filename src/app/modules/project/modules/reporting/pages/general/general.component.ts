import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { GroupTitle, SectionTitle } from 'src/app/components/reporting-table/reporting-table.component';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {
  endDate: Date;

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService,
              private fb: FormBuilder ) { }

  protected project: Project;
  grouping = '';

  filter = new BehaviorSubject<any>({});

  dimensionIds = new BehaviorSubject('');

  startDate: Date;
  // collectionSites: object;
  // computation: object;
  requestForm: FormGroup;

  tableContent = new BehaviorSubject<any[]>([]);

  // initial values for the chart
  options =  {fill: false};
  data = {};

  // addDataToGraph(data) {
  //   this.chartService.addData(data);
  // }

  // addDatasetToGraph(data) {
  //   this.chartService.addDataset(data);
  // }

  ngOnInit(): void {

    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      // this.collectionSites = project.entities;
      this.buildIndicators();


      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request once clicked on the plus
      then we remove this dummy variable */
      // if (project.logicalFrames.length > 0 ) {
      //   if (project.logicalFrames[0].indicators[0]) {
      //     this.computation = project.logicalFrames[0].indicators[0].computation;
      //   }
      // }
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
            groupName: purpose.description,
            sectionId: id
          } as GroupTitle);

          rows = rows.concat(purpose.indicators);

          for (const output of purpose.outputs){
            rows.push({
              icon: false,
              groupName: output.description,
              sectionId: id
            } as GroupTitle);

            rows = rows.concat(output.indicators);

            for (const activity of output.activities){
              rows.push({
                icon: false,
                groupName: activity.description,
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
      // TO DO
      // add cross cutting indicators to the table when they work correctly
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
      console.log(this.project.forms);
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

  // responseToGraphData(response, label) {
  //   let grouping = _.clone(this.grouping);

  //   let idToName = false;
  //   if (this.grouping === 'group') {
  //     grouping = 'groups';
  //     idToName = true;
  //   }
  //   if (this.grouping === 'entity') {
  //     grouping = 'entities';
  //     idToName = true;
  //   }

  //   let labels = [];
  //   const keys = Object.keys(response);
  //   if (idToName) {
  //     keys.forEach(key => {
  //       this.project[grouping].find(
  //         group => {
  //           if (group.id === key) { labels.push(group.name); }
  //           if (key === '_total') { labels.push(key); }
  //           });
  //         });
  //   } else {
  //     labels = keys;
  //   }

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label,
  //         data: Object.values(response),
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         backgroundColor: 'rgba(255, 99, 132, 1)',
  //         fill: false,
  //       },
  //     ]
  //   };
  //   return data;
  // }

  receiveFilter(value){
    this.filter.next(value);
  }

  receiveDimension(value){
    this.dimensionIds.next(value);
    this.grouping = value;
  }

}


