import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {

  themes: Theme[];

  constructor(private themeService: ThemeService) { }

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
}
