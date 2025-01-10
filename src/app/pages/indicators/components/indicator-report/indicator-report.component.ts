import { Project } from 'src/app/models/classes/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { CountryListService } from 'src/app/services/country-list.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.scss']
})

export class IndicatorReportComponent implements OnInit, OnDestroy {
  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
              private chartService: ChartService,
              private route: ActivatedRoute,
              private countryList: CountryListService,
              private translate: TranslateService
            ) { }

  filter = new BehaviorSubject<any>({});

  dimensionIds = new BehaviorSubject('');

  tableContent = new BehaviorSubject<any[]>([]);


  mainIndicator: Indicator;
  relatedProjects: Project[];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.chartService.clearChart();

    this.subscription.add(
      this.route.params.subscribe(val => {
        this.indicatorService.get(val.id).then((response: Indicator) => {
          this.mainIndicator = response;
          this.projectService.listByIndicator(this.mainIndicator.id).then(list => {
            this.relatedProjects = list;
            this.buildIndicators();
          });
        });
      })
    );
    this.subscription.add(
      this.translate.onLangChange.subscribe(() => {
        this.buildIndicators();
      })
    )
  }

  buildIndicators(): void{
    const projects = this.relatedProjects.filter(project => project.status === 'Ongoing' || project.status === 'Finished');

    const indicators: ProjectIndicator[] = [];
    for (const project of projects){
        const newIndicator = new ProjectIndicator(project.crossCutting[this.mainIndicator.id]);
        newIndicator.display = `${this.countryList.translateCountry(project.country)} - ${project.name}`;
        // this property is necessary for creating the menu options in the report table
        newIndicator.originProject = project;
        indicators.push(newIndicator);
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
