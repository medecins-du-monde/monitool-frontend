import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { InputService } from 'src/app/services/input.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';



export interface Task {
  buttonText: string;
  buttonIcon: string;
  routerLink: string;
  done: number;
  ongoing: number;
  missing: number;
  total: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['task', 'status'];
  dataSource: Task[];

  taskDataSource = new MatTableDataSource<Task>();

  private subscription: Subscription = new Subscription();
  project: Project;


  constructor(
    private projectService: ProjectService,
    private inputService: InputService
  ) { }

  ngOnInit(): void {
    this.projectService.inBigPage.next(true);
    this.subscription.add(
      this.projectService.openedProject.subscribe( async (project: Project) => {
        this.project = project;

        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: project.country,
          } as BreadcrumbItem,
          {
            value: project.name,
          } as BreadcrumbItem,
          {
            value: 'Input',
          } as BreadcrumbItem,
          {
            value: 'Home',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);

        const data = [];
        for (const form of this.project.forms){
          const list = await this.inputService.list(this.project.id, form.id);

          const max = (a: Date, b: Date) => a >= b ? a : b;
          const min = (a: Date, b: Date) => a >= b ? b : a;

          // gets the first date that is inside the interval of the project and of the form at the same time
          const startDate: Date = max(form.start, this.project.start);
          // gets the last date that is inside the interval of the project and of the form at the same time
          const endDate: Date = min(form.end, min(this.project.end, new Date()));

          let startTimeSlot = TimeSlot.fromDate(startDate.toISOString(), TimeSlotPeriodicity[form.periodicity]);
          const endTimeSlot = TimeSlot.fromDate(endDate.toISOString(), TimeSlotPeriodicity[form.periodicity]);

          const periods = [];
          while (startTimeSlot !== endTimeSlot){
            periods.push(startTimeSlot.value);
            startTimeSlot = startTimeSlot.next();
          }
          periods.push(endTimeSlot.value);

          const total = periods.length * form.entities.length;
          const done = Object.values(list).filter(x => x === 1).length;
          const ongoing = Object.values(list).filter(x => x !== 1).length;
          const missing = total - done - ongoing;

          data.push({
            buttonIcon: 'edit',
            buttonText: form.name,
            routerLink: `/projects/${project.id}/input/inputs/${form.id}`,
            done,
            ongoing,
            missing,
            total
          });
        }
        this.taskDataSource.data = data;
      })
    );
  }

}
