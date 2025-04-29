import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';
import { v4 as uuid } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logical-frames-list',
  templateUrl: './logical-frames-list.component.html',
  styleUrls: ['./logical-frames-list.component.scss']
})
export class LogicalFramesListComponent implements OnInit, OnDestroy {

  project: Project;
  logicalFrames: LogicalFrame[] = [];

  informations = [
    {
      res1: 'InformationPanel.Logical_frames_list',
      res2: 'InformationPanel.Logical_frames_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem
  ];

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.country,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'LogicalFrameworks',
          } as BreadcrumbItem,
        ];
        if (savedProject.region) {
          breadCrumbs.splice(2, 0, 
            {
              value: savedProject.region,
            } as BreadcrumbItem,
          );
        }
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.logicalFrames = project.logicalFrames;
        this.changeDetector.markForCheck();
      })
    );

    this.projectService.updateInformationPanel(this.informations);
  }

  onCreate(): void {
    const newLogicalFrame = new LogicalFrame();
    // initialize dates as project
    newLogicalFrame.start = this.project.start;
    newLogicalFrame.end = this.project.end;
    this.project.logicalFrames.push(newLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${newLogicalFrame.id}`]);
  }

  onClone(logicalFrame: LogicalFrame): void {
    const clonedLogicalFrame = new LogicalFrame(logicalFrame);

    // we change the id and the name to not have the same in the clone
    clonedLogicalFrame.id = uuid();
    clonedLogicalFrame.name = 'CLONE ' + clonedLogicalFrame.name;

    this.project.logicalFrames.push(clonedLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${clonedLogicalFrame.id}`]);
  }

  onEdit(logicalFrame: LogicalFrame): void {
    this.projectService.project.next(this.project);
    this.projectService.revertChanges();
    this.router.navigate([`${this.router.url}/${logicalFrame.id}`]);
  }

  onDelete(logicalFrame: LogicalFrame): void {
    this.project.logicalFrames = this.project.logicalFrames.filter(x => x.id !== logicalFrame.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.logicalFrames, event.previousContainer.data.index, event.container.data.index);
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
