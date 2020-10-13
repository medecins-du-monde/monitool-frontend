import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  formId: any;

  sites = [];
  private subscription: Subscription = new Subscription();

  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        const form = this.project.forms.find(x => x.id = this.formId);
        this.sites = form ? form.entities.map(x => x.name) : [];
        console.log(this.sites);
        if (form){ console.log(form.periodicity); }
      })
    );
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        const form = this.project.forms.find(x => x.id = this.formId);
        this.sites = form ? form.entities.map(x => x.name) : [];
        console.log(this.sites);
      })
    );
  }

}
