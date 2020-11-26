import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CloneProjectModalComponent } from '../clone-project-modal/clone-project-modal.component';
import { User } from 'src/app/models/user.model';


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

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
   }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
    this.projectOwner = (this.project.users.filter(user => user.id === this.currentUser.id).length > 0);

  }

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
    } else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)){
      return 'star';
    } else {
      return 'star_border';
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
