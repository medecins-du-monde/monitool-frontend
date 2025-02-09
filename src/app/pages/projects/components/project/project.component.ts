import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActionProjectModalComponent } from '../action-project-modal/action-project-modal.component';
import { InputService } from 'src/app/services/input.service';
import * as JSZip from 'jszip';
import { CountryListService } from 'src/app/services/country-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {

  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() clone = new EventEmitter();
  @Output() cloneWithData = new EventEmitter();
  @Output() getProjects: EventEmitter<any> = new EventEmitter();

  currentUser: User;
  projectOwner: boolean;
  lastEntry: string;
  loading = false;

  private subscription: Subscription = new Subscription();

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private inputService: InputService,
    private route: ActivatedRoute,
    public countryList: CountryListService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
        this.projectOwner = (this.project.users.filter(projectUser => projectUser.id === this.currentUser.id).length > 0);
      })
    );
  }

  onOpen(): void {
    // // Get the project id to redirect MDM Account properly if needed
    // this.projectService.updateProjectId(this.project.id);
    // this.router.navigate(['/projects', this.project.id]);

    const url = this.router.serializeUrl(
      this.router.createUrlTree([this.project.id], { relativeTo: this.route })
    );

    window.open(url, '_blank');
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'DeleteProject', infos: 'DeleteProjectInfo'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.delete.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  onRestore(): void {
    this.restore.emit(this.project);
  }

  onClone(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'CloneProject', infos: 'CloneProjectInfo'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.clone.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  onCloneWithData(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'CloneProject', infos: 'CloneProjectInfoData'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.cloneWithData.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  onDownload(): void {
    this.loading = true;
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    this.projectService.get(this.project.id).then(async (project: Project) => {
      if (project) {
        const jszip = new JSZip();
        jszip.file(`${project.country}.json`, this.stringifyJSONObj(project));
        for (const form of project.forms) {
          await this.inputService.getForDownload(project.id, form.id).then(val => {
            if (val) {
              jszip.folder('Inputs').file(`${form.name}-value.json`, this.stringifyJSONObj(val), {createFolders: false});
            }
          });
        }
        jszip.generateAsync({ type: 'blob' }).then((content) => {
          this.loading = false;
          // see FileSaver.js
          const url = window.URL.createObjectURL(content);
          dlAnchorElem.setAttribute('href', url);
          dlAnchorElem.setAttribute('download', `${project.country}.zip`);
          dlAnchorElem.click();
        });
      }
    });
    return;
  }

  private stringifyJSONObj(obj: any) {
    let result = '{';
    const objEntries = Object.entries(obj);
    for (const [i, value] of objEntries.entries()) {
      result += `"${value[0]}": `;
      if (typeof value[1] === 'object' && value[1] !== null) {
        result += this.stringifyJSONObj(value[1]);
      } else {
        result += JSON.stringify(value[1]);
      }
      if (i !== objEntries.length - 1) {
        result += ',';
      }
    }
    result += '}';
    return result;
  }

  projectCardAvatar(): string {
    if (this.projectOwner) {
      return 'person';
    }
    else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  toggleFavourite(): void {
    if (!this.projectOwner) {
      this.getProjects.emit();
      if (!localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)) {
        localStorage.setItem('user::' + this.currentUser.id + 'favorite' + this.project.id, 'true');
      } else {
        localStorage.removeItem('user::' + this.currentUser.id + 'favorite' + this.project.id);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
