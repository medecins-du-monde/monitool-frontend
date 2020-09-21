import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultiLanguage } from 'src/app/models/multi-language.model';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeModalComponent } from '../../components/theme-modal/theme-modal.component';
@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {

  themes: Theme[];

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getThemes();
  }

  private getThemes() {
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
    });
  }

  onDelete(id: string) {
    this.themeService.delete(id).then(() => this.getThemes());
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      const theme = new Theme();
      theme.name = new MultiLanguage({ en: 'test', es: 'test', fr: 'test' });
      theme.shortName = new MultiLanguage({ en: 'TE', es: 'TE', fr: 'TE' });
      this.themeService.save(theme);
    });
  }
}
