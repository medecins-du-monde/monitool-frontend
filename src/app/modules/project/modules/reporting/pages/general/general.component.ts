import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ChartService } from 'src/app/services/chart.service';
import { GroupTitle } from 'src/app/models/interfaces/report/rows/group-title.model';
import { SectionTitle } from 'src/app/models/interfaces/report/rows/section-title.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { ThemeService } from 'src/app/services/theme.service';
import { Filter } from 'src/app/components/report/filter/filter.component';
import { Theme } from 'src/app/models/classes/theme.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { Entity } from 'src/app/models/classes/entity.model';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.General_reporting',
      res2: 'InformationPanel.General_reporting_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question1',
      res2: 'InformationPanel.General_reporting_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question2',
      res2: 'InformationPanel.General_reporting_response2'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question3',
      res2: 'InformationPanel.General_reporting_response3'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question4',
      res2: 'InformationPanel.General_reporting_response4'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question5',
      res2: 'InformationPanel.General_reporting_response5'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question6',
      res2: 'InformationPanel.General_reporting_response6'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question7',
      res2: 'InformationPanel.General_reporting_response7'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question8',
      res2: 'InformationPanel.General_reporting_response8'
    } as InformationItem
  ];

  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
              private themeService: ThemeService,
              private chartService: ChartService,
              private translateService: TranslateService ) { }

  project: Project;

  filter = new BehaviorSubject<Filter>({
    _start: new Date(),
    _end: new Date(),
  });

  dimensionIds = new BehaviorSubject('');
  entities: Entity[];
  tableContent = new BehaviorSubject<any[]>([]);

  themes: Theme[];
  crosscutting: Indicator[];
  multiThemesIndicators: Indicator[];
  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  ngOnInit(): void {
    this.projectService.inBigPage.next(true);
    this.chartService.clearChart();
    this.translateService.onLangChange.subscribe(() => {
      this.updateBreadcrumbs(this.project);
      this.buildIndicators();
    });
    this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
      this.updateBreadcrumbs(savedProject);
    });
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.entities = this.project.entities;
      this.indicatorService.listForProject(this.project.themes.map(x => x.id))
        .then((crosscutting: Indicator[]) => {
          this.crosscutting = crosscutting;
          this.buildIndicators();
        });
    });

    this.themeService.list().then( (themes: Theme[]) => {
      this.themes = themes;
      this.buildIndicators();
    });
    this.projectService.updateInformationPanel(this.informations);
  }




  buildIndicators(): void{
    if (!(this.themes && this.crosscutting && this.project)){
      return;
    }
    let rows = [];
    let id = 0;
    let level = 0;

    if (this.project.logicalFrames){
      for (const logicalFrame of this.project.logicalFrames){
        rows.push({
          title: `${this.translateService.instant('LogicalFramework')}: ${logicalFrame.name}`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);

        rows.push({
          icon: false,
          groupName: `${this.translateService.instant('GeneralObjective')}: ${logicalFrame.goal}`,
          sectionId: id,
          level
        } as GroupTitle);

        rows = rows.concat(logicalFrame.indicators);

        level += 1;
        for (const purpose of logicalFrame.purposes){
          rows.push({
            icon: false,
            groupName: `${this.translateService.instant('SpecificObjective')}: ${purpose.description}`,
            sectionId: id,
            level
          } as GroupTitle);

          rows = rows.concat(purpose.indicators);

          level += 1;
          for (const output of purpose.outputs){
            rows.push({
              icon: false,
              groupName: `${this.translateService.instant('Result')}: ${output.description}`,
              sectionId: id,
              level
            } as GroupTitle);

            rows = rows.concat(output.indicators);

            level += 1;
            for (const activity of output.activities){
              rows.push({
                icon: false,
                groupName: `${this.translateService.instant('Activity')}: ${activity.description}`,
                sectionId: id,
                level
              } as GroupTitle);

              rows = rows.concat(activity.indicators);
            }
            level -= 1;
          }
          level -= 1;
        }
        id += 1;
        level -= 1;
      }
    }

    if (this.project.crossCutting){

      this.buildCrossCuttingIndicators();

      rows.push({
        title: `${this.translateService.instant('CrossCuttingIndicators')}`,
        sectionId: id,
        open: false,
        level
      } as SectionTitle);

      if (this.multiThemesIndicators.length > 0){
        rows.push({
          icon: false,
          groupName: `${this.translateService.instant('MultipleThematics')}`,
          sectionId: id,
          level
        } as GroupTitle);

        for (const indicator of this.multiThemesIndicators){
          if (indicator.id in this.project.crossCutting){
            const projectIndicator = new ProjectIndicator(this.project.crossCutting[indicator.id]);
            // TODO: choose right language here
            projectIndicator.display = indicator.name.en;
            rows.push(projectIndicator);
          }
          else{
            rows.push(new ProjectIndicator(indicator));
          }
        }
      }

      if (this.groups.length > 0){
        for (const group of this.groups){
          rows.push({
            icon: false,
            // TODO: choose right language here
            groupName: group.theme.name.en,
            sectionId: id,
            level
          });

          for (const indicator of group.indicators){
            if (indicator.id in this.project.crossCutting){
              const projectIndicator = new ProjectIndicator(this.project.crossCutting[indicator.id]);
              // TODO: choose right language here
              projectIndicator.display = indicator.name.en;
              rows.push(projectIndicator);
            }
            else{
              rows.push(new ProjectIndicator(indicator));
            }
          }
        }
      }

    }

    if (this.project.extraIndicators){
      rows.push({
        title: `${this.translateService.instant('ExtraIndicators')}`,
        sectionId: id,
        open: false,
        level: 0
      }as SectionTitle);

      rows = rows.concat(this.project.extraIndicators);
      id += 1;
    }

    if (this.project.forms){
      for (const form of this.project.forms){
        rows.push({
          title: `${this.translateService.instant('DataSource')}: ${form.name}`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);

        for (const element of form.elements){
          // TODO: Replace the a by another thing
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

  buildCrossCuttingIndicators(): void {
    this.multiThemesIndicators = [];
    for (const c of this.crosscutting){
      if (c.multiThemes){
        this.multiThemesIndicators.push(c);
      }
      else{
        const group = this.groups.find(g => g.theme === c.themes[0]);
        if (group){
          group.indicators.push(c);
        }
        else{
          this.groups.push({
            theme: c.themes[0],
            indicators: [c]
          });
        }
      }
    }
  }

  get chartData(){
    return this.chartService.data.value;
  }

  receiveFilter(value): void{
    value.entities = value.entities.filter(e => this.entities.includes(e)).map(e => e.id);
    this.filter.next(value);
  }

  receiveDimension(value): void{
    this.dimensionIds.next(value);
  }

  updateBreadcrumbs(project: Project): void {
    const breadCrumbs = [
      {
        value: `${this.translateService.instant('Projects')}`,
        link: './../../projects'
      } as BreadcrumbItem,
      {
        value: project.country,
      } as BreadcrumbItem,
      {
        value: project.name,
      } as BreadcrumbItem,
      {
        value: 'Reporting',
      } as BreadcrumbItem,
      {
        value: 'General',
      } as BreadcrumbItem,
    ];
    this.projectService.updateBreadCrumbs(breadCrumbs);
  }
}


