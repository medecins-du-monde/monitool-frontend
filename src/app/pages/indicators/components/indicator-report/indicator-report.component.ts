import { forEach } from 'lodash';
import { Project } from 'src/app/models/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/indicator.model';
import { SectionTitle } from 'src/app/components/report/reporting-table/reporting-table.component';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.scss']
})

export class IndicatorReportComponent implements OnInit, OnDestroy {
  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
              private themeService: ThemeService,
              private chartService: ChartService,
              private route: ActivatedRoute ) { }
 
  // protected project: Project;
  
  filter = new BehaviorSubject<any>({});

  dimensionIds = new BehaviorSubject('');

  tableContent = new BehaviorSubject<any[]>([]);
  
  options =  {fill: false};

  mainIndicator: Indicator;
  relatedProjects: Project[];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(val => {
        this.indicatorService.get(val.id).then((response: Indicator) => {
          this.mainIndicator = response;
          this.projectService.listByIndicator(this.mainIndicator.id).then(response => {
            this.relatedProjects = response;
            this.buildIndicators();
          })
        })
      })
    );
  }

  buildIndicators() {
    this.relatedProjects = this.relatedProjects.filter(project => project.status === 'Ongoing');

    const indicators = [];

    for (const project of this.relatedProjects){
      console.log(project.crossCutting);
      if (this.mainIndicator.id in project.crossCutting){

        const newIndicator = new ProjectIndicator(project.crossCutting[this.mainIndicator.id]);
        newIndicator.display = `${project.country} - ${project.name}`;
        console.log(newIndicator);
        indicators.push(newIndicator);
      }
    }

    this.tableContent.next(indicators);
  }

  get chartData(){
    return this.chartService.data.value;
  }

  receiveFilter(value){
    this.filter.next(value);
  }

  receiveDimension(value){
    this.dimensionIds.next(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
