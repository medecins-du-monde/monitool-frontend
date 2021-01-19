import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { InputService } from 'src/app/services/input.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CloneProjectModalComponent } from '../clone-project-modal/clone-project-modal.component';
import { User } from 'src/app/models/user.model';
import DatesHelper from 'src/app/utils/dates-helper';


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
  @Output() getProjects: EventEmitter<any> = new EventEmitter();

  currentUser: User;
  projectOwner: boolean;
  lastEntry: string;

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private inputService: InputService,
  ) {}

  ngOnInit(): void {
    this.getLastEntry().then(result => this.lastEntry = result);
    this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = new User(user);
      this.projectOwner = (this.project.users.filter(projectUser => projectUser.id === this.currentUser.id).length > 0);
    });

  }

  // Make an async method in the service.
  async getLastEntry(): Promise<string>{
    let newLastEntry = this.lastEntry;
    if (this.project.forms.length > 0){
      for (const form of this.project.forms) {
         await this.inputService.list(this.project.id, form.id).then(
          async data => {
            const items = Object.entries(data);
            for (const item of items) {
                // item[0] is the id of the input
                const itemDataSplit = item[0].split(':');

                // itemDataSplit[3] is the form id also called datasource.
                // itemDataSplit[4] is the entity id
                // itemDataSplit[5] is the update period
                await this.inputService.get( this.project.id, itemDataSplit[4], itemDataSplit[3], itemDataSplit[5]).then(
                  entryData => {
                    newLastEntry = DatesHelper.getTheBiggest(newLastEntry, entryData[0].updatedAt);
                     }
                  );
            }
          });
      }
    }
    return newLastEntry;
  }

  async onOpen(): Promise<void> {
    this.projectService.get(this.project.id).then(() => {
      this.router.navigate(['/project', this.project.id]);
    });
  }

  onDelete(): void{
    this.delete.emit(this.project);
  }

  onRestore(): void{
    this.restore.emit(this.project);
  }

  onClone(): void{
    const dialogRef = this.dialog.open(CloneProjectModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.clone.emit(this.project);
      }
    });
  }

  projectCardAvatar() {
    if (this.project.users.length > 0) {
      if (this.projectOwner) {
        return 'person';
      }
      else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)){
        return 'star';
      } else {
        return 'star_border';
      }
    }
  }

  toggleFavourite() {
    if (!this.projectOwner) {
      this.getProjects.emit();
      if (!localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)) {
        localStorage.setItem('user::' + this.currentUser.id + 'favorite' + this.project.id, 'true');
      } else {
        localStorage.removeItem('user::' + this.currentUser.id + 'favorite' + this.project.id);
      }
    }
  }

}
