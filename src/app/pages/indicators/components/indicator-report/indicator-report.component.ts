import { Project } from 'src/app/models/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/indicator.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.scss']
})

export class IndicatorReportComponent implements OnInit, OnDestroy {
  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
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

  buildIndicators(): void{
    this.relatedProjects = this.relatedProjects.filter(project => project.status === 'Ongoing');

    const indicators = [];

    for (const project of this.relatedProjects){
      if (this.mainIndicator.id in project.crossCutting){

        const newIndicator = new ProjectIndicator(project.crossCutting[this.mainIndicator.id]);
        newIndicator.display = `${project.country} - ${project.name}`;
        // this property is necessary for creating the menu options in the report table
        newIndicator.originProject = project;
        indicators.push(newIndicator);
      }
    }

    this.tableContent.next(indicators);
  }

  get chartData(): unknown{
    return this.chartService.data.value;
  }

  receiveFilter(value: unknown): void{
    this.filter.next(value);
  }

  receiveDimension(value: string): void{
    this.dimensionIds.next(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
