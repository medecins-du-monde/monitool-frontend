import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
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
  @Input() highlighted: boolean;
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() cloned = new EventEmitter<Project>();
  @Output() getProjects: EventEmitter<any> = new EventEmitter();

  currentUser: User;
  projectOwner: boolean;
  lastEntry: string;
  loading = false;
  cardTitle: string;

  clonePanelOpen = false;

  // Tried in order, first one that fits wins. The badge sits at the right edge of the card, so
  // the end-aligned variants are what keep the panel on screen for the rightmost column; the
  // above-the-badge variants do the same for the last row.
  readonly clonePanelPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 }
  ];

  private clonePanelCloseTimer: ReturnType<typeof setTimeout> = null;

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
    this.cardTitle = this.project.countries.map(country => this.countryList.translateCountry(country)).join(', ');
  }

  openClonePanel(): void {
    this.cancelCloseClonePanel();
    this.clonePanelOpen = true;
  }

  // Closing is delayed so the pointer can travel off the badge and into the panel — which it has
  // to do, since the "From" line holds a link the user needs to be able to click.
  scheduleCloseClonePanel(): void {
    this.cancelCloseClonePanel();
    this.clonePanelCloseTimer = setTimeout(() => this.closeClonePanel(), 200);
  }

  closeClonePanel(): void {
    this.cancelCloseClonePanel();
    this.clonePanelOpen = false;
  }

  private cancelCloseClonePanel(): void {
    if (this.clonePanelCloseTimer !== null) {
      clearTimeout(this.clonePanelCloseTimer);
      this.clonePanelCloseTimer = null;
    }
  }

  onOpen(): void {
    // // Get the project id to redirect MDM Account properly if needed
    // this.projectService.updateProjectId(this.project.id);
    // this.router.navigate(['/projects', this.project.id]);

    this.openProject(this.project.id);
  }

  private openProject(id: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([id], { relativeTo: this.route })
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
    this.performClone(false);
  }

  onCloneWithData(): void {
    this.performClone(true);
  }

  private performClone(withData: boolean): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, {
      data: {
        title: 'CloneProject',
        infos: withData ? 'CloneProjectInfoData' : 'CloneProjectInfo',
        action: () => withData ? this.projectService.cloneWithData(this.project.id) : this.projectService.clone(this.project.id),
        successMessage: 'CloneSuccess',
        errorMessage: 'CloneError'
      }
    });

    const dialogSubscription = dialogRef.afterClosed().subscribe((res: { result: Project; open: boolean }) => {
      dialogSubscription.unsubscribe();
      if (res && res.result) {
        this.cloned.emit(res.result);
        if (res.open) {
          this.openProject(res.result.id);
        }
      }
    });
  }

  onDownload(): void {
    this.loading = true;
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    this.projectService.get(this.project.id).then(async (project: Project) => {
      if (project) {
        const jszip = new JSZip();
        jszip.file(`${project.countries.join('_')}.json`, this.stringifyJSONObj(project));
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
          dlAnchorElem.setAttribute('download', `${project.countries.join('_')}.zip`);
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
    } else if (this.currentUser.favoriteProjects?.includes(this.project.id)) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  async toggleFavourite(): Promise<void> {
    if (!this.projectOwner && this.currentUser.rev) {
      await this.authService.toggleFavorite(this.project.id);
      this.getProjects.emit();
    }
  }

  ngOnDestroy(): void {
    this.cancelCloseClonePanel();
    this.subscription.unsubscribe();
  }

}
