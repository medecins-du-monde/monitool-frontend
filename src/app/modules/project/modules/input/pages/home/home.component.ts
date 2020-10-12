import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


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


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        console.log(this.project.forms);
        this.taskDataSource.data = this.project.forms.map(form => {
          return {
            buttonIcon: 'edit',
            buttonText: form.name,
            routerLink: '.',
            done: 40,
            ongoing: 40,
            missing: 20,
            total: 119
          };
        });
      })
    );
  }

}
