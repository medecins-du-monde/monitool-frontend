import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() clone = new EventEmitter();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  async onOpen(): Promise<void> {
    this.projectService.get(this.project.id).then(() => {
      this.router.navigate(['/project', this.project.id]);
    });
  }

  onDelete() {
    this.delete.emit(this.project);
  }

  onRestore() {
    this.restore.emit(this.project);
  }

  onClone() {
    this.clone.emit(this.project);
  }
}
