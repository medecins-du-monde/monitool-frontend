import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
import {
  CommentService,
  Comment,
  CommentFilter,
  findContentIndexByFilter
} from 'src/app/services/comment.service';
import { skip } from 'rxjs/operators';

type RowWithCommentInfo = {
  commentInfo: Comment;
  [key: string]: any;
};

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  informations = [
    {
      res1: 'InformationPanel.General_reporting',
      res2: 'InformationPanel.General_reporting_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_reporting_question9',
      res2: 'InformationPanel.General_reporting_response9',
      new: true
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

  constructor(
    private projectService: ProjectService,
    private indicatorService: IndicatorService,
    private themeService: ThemeService,
    private chartService: ChartService,
    private translateService: TranslateService,
    private commentService: CommentService
  ) {}

  project: Project;

  filter = new BehaviorSubject<Filter>({
    _start: new Date(),
    _end: new Date()
  });

  get globalCommentFilters(): Omit<CommentFilter, 'disaggregatedBy'> {
    const dimension = this.dimensionIds.getValue();

    return {
      dimension
    };
  }

  dimensionIds = new BehaviorSubject('');
  entities: Entity[];
  tableContent = new BehaviorSubject<any[]>([]);

  themes: Theme[];
  crosscutting: Indicator[];
  multiThemesIndicators: Indicator[] = [];
  groups: { theme: Theme; indicators: Indicator[] }[] = [];

  showComments = true;
  userIsAdmin = false;

  private subscription: Subscription = new Subscription();

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    this.projectService.inBigPage.next(true);
    this.chartService.clearChart();
    this.subscription.add(
      this.translateService.onLangChange.subscribe(() => {
        this.updateBreadcrumbs(this.project);
        this.buildIndicators();
      })
    );
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        this.updateBreadcrumbs(savedProject);
      })
    );
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.entities = this.project.entities;
        this.indicatorService
          .listForProject(this.project.themes.map(x => x.id))
          .then((crosscutting: Indicator[]) => {
            this.crosscutting = crosscutting;
            this.buildIndicators();
          });
      })
    );

    this.themeService.list().then((themes: Theme[]) => {
      this.themes = themes;
      this.buildIndicators();
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.toggleInfoDisplay();

    // Update the table comments when filters or dimension change
    // this.filter.subscribe(() => {
    //   // this.updateTableComments();
    // });
    // this.dimensionIds.subscribe(() => {
    //   // this.updateTableComments();
    // });
  }

  buildIndicators(): void {
    if (!(this.themes && this.crosscutting && this.project)) {
      return;
    }
    const rows = [];
    let id = 0;
    let level = 0;

    // Paths of all the comments on the table
    const commentsToLoad: string[] = [];

    let path = '';
    const addCommentToFetch = (p: string) => {
      const newPath = p ? (path ? path + '|' : '') + p : path;
      commentsToLoad.push(newPath);
    };

    if (this.project.logicalFrames) {
      for (const logicalFrame of this.project.logicalFrames) {
        path = `logicalFrame:${logicalFrame.id}`;

        rows.push({
          title: `${this.translateService.instant('LogicalFramework')}: ${
            logicalFrame.name
          }`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);
        addCommentToFetch('name');

        rows.push({
          icon: false,
          groupName: `${this.translateService.instant('GeneralObjective')}: ${
            logicalFrame.goal
          }`,
          sectionId: id,
          level
        } as GroupTitle);
        addCommentToFetch('goal');

        logicalFrame.indicators.forEach(ind => {
          rows.push(ind);
          addCommentToFetch('indicator:' + ind.id);
        });

        level += 1;
        for (const purpose of logicalFrame.purposes) {
          const pathAux = path;
          path += '|purpose:' + purpose.id;
          rows.push({
            icon: false,
            groupName: `${this.translateService.instant(
              'SpecificObjective'
            )}: ${purpose.description}`,
            sectionId: id,
            level
          } as GroupTitle);
          addCommentToFetch('');

          purpose.indicators.forEach(ind => {
            rows.push(ind);
            addCommentToFetch('indicator:' + ind.id);
          });

          level += 1;
          for (const output of purpose.outputs) {
            const pathAux2 = path;
            path += '|output:' + output.id;
            rows.push({
              icon: false,
              groupName: `${this.translateService.instant('Result')}: ${
                output.description
              }`,
              sectionId: id,
              level
            } as GroupTitle);
            addCommentToFetch('');

            output.indicators.forEach(ind => {
              rows.push(ind);
              addCommentToFetch('indicator:' + ind.id);
            });

            level += 1;
            for (const activity of output.activities) {
              const pathAux3 = path;
              path += '|activity:' + activity.id;
              rows.push({
                icon: false,
                groupName: `${this.translateService.instant('Activity')}: ${
                  activity.description
                }`,
                sectionId: id,
                level
              } as GroupTitle);
              addCommentToFetch('');

              activity.indicators.forEach(ind => {
                rows.push(ind);
                addCommentToFetch('indicator:' + ind.id);
              });

              // Reset path to only the logical frame + purpose + output
              path = pathAux3;
            }
            level -= 1;

            // Reset path to only the logical frame + purpose
            path = pathAux2;
          }
          level -= 1;

          // Reset path to only the logical frame
          path = pathAux;
        }
        id += 1;
        level -= 1;
      }
    }

    if (this.project.crossCutting) {
      path = 'crossCutting';
      this.buildCrossCuttingIndicators();

      rows.push({
        title: `${this.translateService.instant('CrossCuttingIndicators')}`,
        sectionId: id,
        open: false,
        level
      } as SectionTitle);
      addCommentToFetch('name');

      if (this.multiThemesIndicators.length > 0) {
        rows.push({
          icon: false,
          groupName: `${this.translateService.instant('MultipleThematics')}`,
          sectionId: id,
          level
        } as GroupTitle);
        addCommentToFetch('multiThematic');

        path = '';
        for (const indicator of this.multiThemesIndicators) {
          if (indicator.id in this.project.crossCutting) {
            const projectIndicator = new ProjectIndicator(
              this.project.crossCutting[indicator.id]
            );
            // TODO: choose right language here
            projectIndicator.display = indicator.name.en;
            rows.push(projectIndicator);
          } else {
            rows.push(new ProjectIndicator(indicator));
          }
          addCommentToFetch(indicator.id);
        }
      }

      if (this.groups.length > 0) {
        for (const group of this.groups) {
          path = '';
          rows.push({
            icon: false,
            // TODO: choose right language here
            groupName: group.theme.name.en,
            sectionId: id,
            level
          });
          addCommentToFetch(group.theme.id);

          for (const indicator of group.indicators) {
            if (indicator.id in this.project.crossCutting) {
              const projectIndicator = new ProjectIndicator(
                this.project.crossCutting[indicator.id]
              );
              // TODO: choose right language here
              projectIndicator.display = indicator.name.en;
              rows.push(projectIndicator);
            } else {
              rows.push(new ProjectIndicator(indicator));
            }
            addCommentToFetch(indicator.id);
          }
        }
      }
    }

    if (this.project.extraIndicators) {
      path = '';
      rows.push({
        title: `${this.translateService.instant('ExtraIndicators')}`,
        sectionId: id,
        open: false,
        level: 0
      } as SectionTitle);
      addCommentToFetch('extraIndicators');

      this.project.extraIndicators.forEach(ind => {
        rows.push(ind);
        addCommentToFetch('indicator:' + ind.id);
      });
      id += 1;
    }

    if (this.project.forms) {
      for (const form of this.project.forms) {
        path = `form:${form.id}`;
        rows.push({
          title: `${this.translateService.instant('DataSource')}: ${form.name}`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);
        addCommentToFetch('name');

        for (const element of form.elements) {
          // TODO: Replace the a by another thing
          const computation = {
            formula: 'a',
            parameters: {
              a: {
                elementId: element.id,
                filter: {}
              }
            }
          };
          rows.push(
            new ProjectIndicator({
              display: element.name,
              baseline: 0,
              target: 0,
              colorize: false,
              computation
            })
          );
          addCommentToFetch('element:' + element.id);
        }

        id += 1;
      }
    }
    this.tableContent.next(rows);

    const comments = this.commentService.getByPath(commentsToLoad);
    // Update rows once comments are loaded
    comments.forEach((comment, index) => {
      if (!comment) {
        rows[index].commentInfo = {
          path: commentsToLoad[index],
          content: []
        };
      } else {
        rows[index].commentInfo = comment;
      }
    });

    this.updateTableComments(rows);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTableComments(rows?: RowWithCommentInfo[]): void {
    const oldRows: RowWithCommentInfo[] = rows || this.tableContent.getValue();

    const newRows = oldRows.map(row => {
      const commentInfo = row.commentInfo;

      const filters: CommentFilter = {
        ...this.globalCommentFilters,
        disaggregatedBy: row.disaggregatedBy || {}
      };

      // Check if there is a comment with the same filters
      const contentIndex = findContentIndexByFilter(commentInfo, filters);
      const content =
        contentIndex !== -1 ? commentInfo.content[contentIndex] : null;

      // If no match, remove old comments, if any
      if (!content) {
        delete row.comment;
        row.comments = {};
        return row;
      }

      // Check if the row corresponds to an indicator
      const path = row.commentInfo.path;
      const pathArr = path.split('|');
      const isIndicator = ['indicator:', 'element:'].some(prefix =>
        pathArr[pathArr.length - 1].startsWith(prefix)
      );

      if (isIndicator) { row.comments = content.comments; }
      else { row.comment = content.comment; }

      return row;
    });

    this.tableContent.next(newRows);
  }

  buildCrossCuttingIndicators(): void {
    this.multiThemesIndicators = [];
    for (const c of this.crosscutting) {
      if (this.project.crossCutting[c.id]) {
        if (c.multiThemes) {
          this.multiThemesIndicators.push(c);
        } else {
          const group = this.groups.find(g => g.theme.id === c.themes[0].id);
          if (group) {
            if (!group.indicators.find(i => i.id === c.id)) {
              group.indicators.push(c);
            }
          } else {
            this.groups.push({
              theme: c.themes[0],
              indicators: [c]
            });
          }
        }
      }
    }
  }

  get chartData() {
    return this.chartService.data.value;
  }

  receiveFilter(value): void {
    value.entities = value.entities
      .filter(e => this.entities.includes(e))
      .map(e => e.id);
    this.filter.next(value);
  }

  receiveDimension(value): void {
    this.dimensionIds.next(value);
  }

  updateBreadcrumbs(project: Project): void {
    const breadCrumbs = [
      {
        value: `${this.translateService.instant('Projects')}`,
        link: './../../projects'
      } as BreadcrumbItem,
      {
        value: project.country
      } as BreadcrumbItem,
      {
        value: project.name
      } as BreadcrumbItem,
      {
        value: 'Reporting'
      } as BreadcrumbItem,
      {
        value: 'General'
      } as BreadcrumbItem
    ];
    this.projectService.updateBreadCrumbs(breadCrumbs);
  }

  updateUserIsAdmin(value: boolean) {
    this.userIsAdmin = value;
    this.projectService.inBigPage.next(!value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
