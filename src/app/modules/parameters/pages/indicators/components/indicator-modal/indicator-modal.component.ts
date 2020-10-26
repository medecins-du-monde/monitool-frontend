import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-indicator-modal',
  templateUrl: './indicator-modal.component.html',
  styleUrls: ['./indicator-modal.component.scss']
})
export class IndicatorModalComponent implements OnInit {

  indicatorForm: FormGroup;

  languages = ['fr', 'en', 'es'];

  themes: Theme[];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedThemes() {
    return this.indicatorForm.controls.themes.value;
  }

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private themeService: ThemeService,
    public dialogRef: MatDialogRef<IndicatorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Indicator
  ) { }

  ngOnInit(): void {
    this.indicatorForm = this.fb.group({
      _id: this.data ? this.data.id : null,
      themes: [[], [Validators.required, Validators.minLength(1)]],
      name: this.fb.group({
        en: [this.data ? this.data.name.en : '', Validators.required],
        es: [this.data ? this.data.name.es : '', Validators.required],
        fr: [this.data ? this.data.name.fr : '', Validators.required]
      }),
      description: this.fb.group({
        en: [this.data ? this.data.description.en : '', Validators.required],
        es: [this.data ? this.data.description.es : '', Validators.required],
        fr: [this.data ? this.data.description.fr : '', Validators.required]
      }),
      _rev: this.data ? this.data.rev : null
    });
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
      if (this.data) {
        this.indicatorForm.controls.themes.setValue(this.themes.filter(x => this.data.themes.map(t => t.id).includes(x.id)));
      }
    });
  }

  onSubmit() {
    const indicator = new Indicator(this.indicatorForm.value);
    this.dialogRef.close({ data: indicator });
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.indicatorForm.controls.themes.value;
    this.indicatorForm.controls.themes.setValue(themes.filter(t => t.id !== theme.id));
  }

}
