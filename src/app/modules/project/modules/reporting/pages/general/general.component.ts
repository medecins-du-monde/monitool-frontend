import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ChartService } from 'src/app/services/chart.service';
import { BehaviorSubject } from 'rxjs';
import { GroupTitle, SectionTitle } from 'src/app/components/report/reporting-table/reporting-table.component';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/indicator.model';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {
  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
              private themeService: ThemeService,
              private chartService: ChartService ) { }

  protected project: Project;

  filter = new BehaviorSubject<any>({});

  dimensionIds = new BehaviorSubject('');

  tableContent = new BehaviorSubject<any[]>([]);

  options =  {fill: false};

  themes: Theme[];
  crosscutting: Indicator[];
  multiThemesIndicators: Indicator[];
  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
     
      this.indicatorService.listForProject(this.project.themes.map(x => x.id))
        .then((crosscutting: Indicator[]) => { 
          this.crosscutting = crosscutting;
          this.buildIndicators();
        });
    });

    this.themeService.list().then( (themes: Theme[]) => {
      this.themes = themes;
      this.buildIndicators();
    })
  }


  buildIndicators() : void{
    if (!(this.themes && this.crosscutting && this.project)){
      return;
    }
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
    
      this.buildCrossCuttingIndicators();

      rows.push({
        title: 'Cross-cutting indicators',
        sectionId: id,
        open: false,
      } as SectionTitle);

      if (this.multiThemesIndicators.length > 0){
        rows.push({
          icon: false,
          groupName: 'Multiple thematics',
          sectionId: id
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
            sectionId: id
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
        title: 'Extra indicators',
        sectionId: id,
        open: false,
      }as SectionTitle);

      rows = rows.concat(this.project.extraIndicators);
      console.log(rows);
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
  
  buildCrossCuttingIndicators(): void {
    this.multiThemesIndicators = [];
    for (const c of this.crosscutting){
      if(c.multiThemes){
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
    this.filter.next(value);
  }

  receiveDimension(value): void{
    this.dimensionIds.next(value);
  }

}


