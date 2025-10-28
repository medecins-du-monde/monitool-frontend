import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Theme, ThemeType } from 'src/app/models/classes/theme.model';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeModalComponent } from './components/theme-modal/theme-modal.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {

  type: ThemeType = 'theme'
  themes: Theme[];

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private router: Router,
    private translateService: TranslateService
  ) {
    if (this.router.url.includes('required')) {
      this.type = 'requiredTheme';
    }
  }

  ngOnInit(): void {
    this.getThemes();
  }

  private getThemes() {
    this.themeService.list(this.type).then((res: Theme[]) => {
      this.themes = res;
    });
  }

  onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'DeleteConfirmation'}});
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res.confirm){
        this.themeService.delete(id).then(() => this.getThemes());
        dialogSubscription.unsubscribe();
      }
    });
  }

  onEdit(theme: Theme) {
    const dialogRef = this.dialog.open(ThemeModalComponent, { data: theme });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.themeService.save(res.data).then(() => this.getThemes());
        dialogSubscription.unsubscribe();
      }
    });
  }

  onDisable(theme: Theme) {
    theme.disabled = !theme.disabled;
    this.themeService.save(theme).then(() => this.getThemes());
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent);

    const dialogSubcription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.themeService.save(res.data).then(() => this.getThemes());
        dialogSubcription.unsubscribe();
      }
    });
  }
}

