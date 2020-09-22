import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.model';
import { Theme } from 'src/app/models/theme.model';
import { ProjectService } from 'src/app/services/project.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

  basicsForm: FormGroup;

  themes: Theme[] = [];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private themeService: ThemeService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.basicsForm = this.fb.group({
        country: [project.country, Validators.required],
        name: [project.name, Validators.required],
        themes: [project.themes, Validators.required],
        start: [project.start, Validators.required],
        end: [project.end, Validators.required],
        visibility: [project.visibility, Validators.required]
      });
    });
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
    });
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.basicsForm.controls.themes.value;
    this.basicsForm.controls.themes.setValue(themes.filter(t => t.id !== theme.id));
  }
}
