import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { Theme } from 'src/app/models/theme.model';
import { ProjectService } from 'src/app/services/project.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit, OnDestroy {

  basicsForm: FormGroup;

  themes: Theme[] = [];

  private subscription: Subscription = new Subscription();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedThemes() {
    return this.basicsForm ? this.themes.filter(x => this.basicsForm.controls.themes.value.includes(x.id)) : [];
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private themeService: ThemeService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    // TODO: Check if the subscription.add is usefull, if yes, we may have to set it everywhere
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.basicsForm = this.fb.group({
          country: [project.country, Validators.required],
          name: [project.name, Validators.required],
          themes: [project.themes.map(x => x.id), Validators.required],
          start: [project.start, Validators.required],
          end: [project.end, Validators.required],
          visibility: [project.visibility, Validators.required]
        });
        this.basicsForm.valueChanges.subscribe((value: any) => {
          const selectedThemes = value.themes;
          value.themes = this.themes.filter(x => selectedThemes.includes(x.id));
          this.projectService.project.next(Object.assign(project, value));
        });
      })
    );

    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.basicsForm.controls.themes.value;
    this.basicsForm.controls.themes.setValue(themes.filter(t => t !== theme.id));
  }
}
