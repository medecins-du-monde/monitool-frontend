import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeModalComponent } from './components/theme-modal/theme-modal.component';

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

  onEdit(theme: Theme) {
    this.themeService.save(theme).then(() => this.getThemes());
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.themeService.save(res.data).then(() => this.getThemes());
      }
    });
  }
}
