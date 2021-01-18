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
  lastEntry: string = "";

  get currentLang() {
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
    this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = new User(user);
      this.projectOwner = (this.project.users.filter(projectUser => projectUser.id === this.currentUser.id).length > 0);
      this.getLastEntry();
    });
    
  }

  getLastEntry(){

    if(this.project.forms.length > 0){
      this.project.forms.forEach((value, index) => {
        this.inputService.list(this.project.id, value.id).then(
          data => {            
            let items = Object.entries(data).slice();
            items.forEach(item => {
              item.forEach(itemData => {
                if(typeof itemData === "string" && itemData != null){
                  let itemDataSplit = itemData.split(":");
                  this.inputService.get( this.project.id, value.entities[0].id, value.id, itemDataSplit[5]).then(
                    entryData => {
                      if(entryData[0].updatedAt > this.lastEntry){
                        this.lastEntry = entryData[0].updatedAt;
                      }
                     }
                  );
                }
              })
            })
          })        
      });
    }
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
