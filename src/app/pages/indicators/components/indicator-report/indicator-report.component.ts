import { forEach } from 'lodash';
import { Project } from 'src/app/models/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/indicator.model';
import { SectionTitle } from 'src/app/components/reporting-table/reporting-table.component';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Theme } from 'src/app/models/theme.model';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.scss']
})
export class IndicatorReportComponent implements OnInit {
  endDate: Date;
  @Input() indicator: ProjectIndicator[];
  private routeSub: Subscription;
  protected project: Project;
  indicators: ProjectIndicator[] = [];
  
  groups: { theme: Theme, indicators: ProjectIndicator[]}[] = [];
  multiThemesIndicators: ProjectIndicator[] = [];


  constructor(private chartService: ChartService,private indicatorService: IndicatorService, private route: ActivatedRoute,private projectService: ProjectService) { }
  //protected project: Project;
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
  indicatorsdata = {};
  
  ngOnInit(): void {

  this.projectService.list().then((res: Project[]) => {
  res.forEach(project => {

    // Initialization of indicatorlist with the one that we already have
    const listOldCrossCutting =  [];
    Object.keys(project.crossCutting).map(x => {
      const crossCutting = project.crossCutting[x];
      crossCutting.id = x;
      listOldCrossCutting.push(crossCutting);
    }
    );
    this.indicatorService
      .listForProject(Object.keys(project.themes)
      .map(x => project.themes[x].id))
      .then((indicators: Indicator[]) => {
      // Adding the indicators not initialized yet
      indicators.map(indicator => {
        const indicatorFound  = listOldCrossCutting.find(x => x.id === indicator.id);
        if (indicatorFound) {
        // Filling all data coming from the indicator configuration
          indicatorFound.themes = indicator.themes;
          // TODO: Filling it with the name in the right language
          indicatorFound.display = indicator.name.en;
          indicatorFound.description = indicator.description;
          this.indicators.push(new ProjectIndicator(indicatorFound));
        }
        else {
          this.indicators.push(new ProjectIndicator(indicator));
        }
      });
      this.indicators.forEach(x => {
        if (x.themes.length > 1) {
          this.multiThemesIndicators.push(x);
        } else if (x.themes.length > 0){
          const group = this.groups.find(g => g.theme.id === x.themes[0].id );
          if ( group ) {
            group.indicators.push(x);
          } else if (x.themes.length > 0){
            this.groups.push({ theme: x.themes[0], indicators: [x] });
          }
        }
      });
    });

  }

)
this.buildIndicators();})


  }
  buildIndicators() {
console.log(this.groups);
    let rows = [];
    let id = 0;
    
    
          rows.push({
        title: 'Cross_Cutting indicators',
        sectionId: id,
        open: false,
      }as SectionTitle);
      // rows = rows.concat(this.groups.map(x=>x));
      for( let group of this.groups)
      {rows.push(group.indicators);}
      console.log(rows);
      id += 1;
      this.tableContent.next(rows);}
      

    // rows = rows.concat(this.groups);
    // id += 1;
   
  //  if (this.project.extraIndicators){
      // rows.push({
      //   title: 'Cross-cutting Indicators',
      //   sectionId: id,
      //   open: false,
      // }as SectionTitle);

      // rows = rows.concat();
      // id += 1;
  //  }

    // if (this.project.forms){
    //   console.log(this.project.forms);
    //   for (const form of this.project.forms){
    //     rows.push({
    //       title: `Data source: ${form.name}`,
    //       sectionId: id,
    //       open: false,
    //     } as SectionTitle);

    // for (const form of this.project.groups){
      // rows.push({
      //   title: 'Extra indicators',
      //   sectionId: id,
      //   open: false,
      // }as SectionTitle);
      // rows = rows.concat(this.groups.values);
      // for (const element of this.indicators){
      //   const computation =  {
      //     formula: 'a',
      //     parameters: {
      //       a: {
      //         elementId: element.id,
      //         filter: {}
      //       }
      //     }
      //   };
      //   rows.push(new ProjectIndicator({
      //     display: element.display,
      //     baseline: 0,
      //     target: 0,
      //     colorize: false,
      //     computation
      //   }));
      // }

      // id += 1;

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
