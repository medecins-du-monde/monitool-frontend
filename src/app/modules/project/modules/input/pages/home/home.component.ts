import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { InputService } from 'src/app/services/input.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import InformationItem from 'src/app/models/interfaces/information-item';
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

  informations = [
    {
      res1: 'InformationPanel.Home_entry',
      res2: ''
    } as InformationItem
  ];

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
      this.projectService.lastSavedVersion.subscribe(savedProject => {
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
            value: 'Input',
          } as BreadcrumbItem,
          {
            value: 'Home',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    )

    this.subscription.add(
      this.projectService.openedProject.subscribe( async (project: Project) => {
        this.project = project;

        const data = [];
        for (const form of this.project.forms){
          const inputs = await this.inputService.list(this.project.id, form.id);
          let done = 0;
          let ongoing = 0;
          let missing = 0;
          let total = 0;

          if (form.periodicity === 'free'){
            done = 0;
            ongoing = 0;
            const differentDays = new Set();
            for (const [inputInfo, inputVal] of Object.entries(inputs)){
              const day = inputInfo.split(':')[5];
              differentDays.add(day);
              if (inputVal === 1){
                done += 1;
              }else{
                ongoing += 1;
              }
            }

            total = differentDays.size * form.entities.length;
            missing = total - done - ongoing;
          } else {
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

            total = periods.length * form.entities.length;
            done = Object.values(inputs).filter(x => x === 1).length;
            ongoing = Object.values(inputs).filter(x => x !== 1).length;
            missing = total - done - ongoing;
          }
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
    this.projectService.updateInformationPanel(this.informations);
  }

}
