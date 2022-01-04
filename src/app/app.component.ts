import { Component, ChangeDetectorRef, AfterViewChecked, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/loading.service';
import { ProjectService } from './services/project.service';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { RefreshSnackbarComponent } from './components/refresh-snackbar/refresh-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'MDM-monitool-Frontend';
  preferredLanguage: string;

  needsInfosPanelSpace = false;

  loadingComponent = false;
  httpLoading = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translateService: TranslateService,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: Router,
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate,
    private dialog: MatDialog
  ) {
    // === Translations ===
    this.translateService.addLangs(['fr', 'en', 'es']);

    this.preferredLanguage = localStorage.getItem('language');
    if (this.preferredLanguage === null){
      this.preferredLanguage = 'fr';
    }
    this.translateService.setDefaultLang(this.preferredLanguage);
    this.translateService.use(this.preferredLanguage);

    // === Icons ===
    this.matIconRegistry.addSvgIcon(
      'add-folder',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/add-folder.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'box-white',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/box-white.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'bulb',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/bulb.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/check.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chevron',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/chevron.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'clipboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/clipboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'database',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/database.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'folder',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/folder.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'format-shapes',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/format-shapes.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gauge',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/gauge.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'grid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/grid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'history',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/history.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/home.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'location',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/location.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'message',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/message.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'organigram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/organigram.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'parameters',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/parameters.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'people',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/people.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/person.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'pie-chart',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/pie-chart.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'quality',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/quality.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/search.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'star',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/star.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/edit.svg')
    );

    this.projectService.infosPanelSpace.subscribe(val => this.needsInfosPanelSpace = val);
  }

  hasUpdate = false;

  ngOnInit(): void {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        setTimeout(() => {
          this.loadingComponent = true;
        });
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        setTimeout(() => {
          this.loadingComponent = false;
        });
      }
    },
    error => {
      setTimeout(() => {
        this.loadingComponent = false;
      });
      console.log('Error while loading : ' + error);
    });

    this.loadingService.loaded.subscribe( isLoading => {
      setTimeout(() => {
        this.httpLoading = isLoading;
      }, 300);
    });

    /*
    // check service worker for updates
    if (this.swUpdate.isEnabled) {
      interval(60000).subscribe(() => this.swUpdate.checkForUpdate().then(() => {
        // checking for updates
      }));
    }
    this.swUpdate.available.subscribe(() => {
      this.hasUpdate = true;
      // this.showSnackBar();
    });
    */
  }

  showSnackBar(): void{
    // this.snackBar.openFromComponent(RefreshSnackbarComponent);
    // const dialogRef = this.dialog.open(ConfirmModalComponent, { data: { messageId: 'NewVersion' } });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
