import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { COPY_FORMULA, CUSTOM_FORMULA, PERCENTAGE_FORMULA, PERMILLE_FORMULA } from 'src/app/models/classes/project-indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { ForceTranslateService } from 'src/app/services/forcetranslate.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-indicator-modal',
  templateUrl: './indicator-modal.component.html',
  styleUrls: ['./indicator-modal.component.scss']
})
export class IndicatorModalComponent implements OnInit, OnDestroy {

  indicatorForm: FormGroup;

  languages = ['fr', 'en', 'es'];

  themes: Theme[];

  dictionary = {};

  private subscription: Subscription = new Subscription();

  public computationTypes = [
    {
      value: 'unavailable',
      display: 'Enum.Computation.unavailable'
    },
    {
      value: 'fixed',
      display: 'Enum.Computation.fixed'
    },
    {
      value: 'copy',
      display: 'Enum.Computation.copy'
    },
    {
      value: 'percentage',
      display: 'Enum.Computation.percentage'
    },
    {
      value: 'permille',
      display: 'Enum.Computation.permille'
    },
    {
      value: 'formula',
      display: 'Enum.Computation.formula'
    },
  ];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedThemes() {
    return this.indicatorForm.controls.themes.value;
  }

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private forceTranslateService: ForceTranslateService,
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
        en: [this.data ? this.data.description.en : ''],
        es: [this.data ? this.data.description.es : ''],
        fr: [this.data ? this.data.description.fr : '']
      }),
      computation: this.fb.group({
        type: [this.data && this.data.computation ? this.data.computation.type : '', Validators.required],
        formula: [this.data && this.data.computation ? this.data.computation.formula : '', Validators.required],
      }),
      _rev: this.data ? this.data.rev : null
    });
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
      if (this.data) {
        this.indicatorForm.controls.themes.setValue(this.themes.filter(x => this.data.themes.map(t => t.id).includes(x.id)));
      }
    });

    this.languages.forEach(language => {
      this.subscription.add(
        this.forceTranslateService.getData(language).subscribe( data => {
          this.dictionary[`${language}`] = data;
        })
      );
    });

    this.onTypeChange({value: this.indicatorForm.value.computation.type}, true)
  }

  getLanguageDictionary(language: string) {
    return this.dictionary[`${language}`];
  }

  onSubmit() {
    const computation = this.indicatorForm.controls.computation as FormGroup;
    computation.controls.formula.enable();
    const indicator = new Indicator(this.indicatorForm.value);
    console.log(indicator);
    this.dialogRef.close({ data: indicator });
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.indicatorForm.controls.themes.value;
    this.indicatorForm.controls.themes.setValue(themes.filter(t => t.id !== theme.id));
  }

  onTypeChange(type: any, init = false): void {
    const computation = this.indicatorForm.controls.computation as FormGroup;

    computation.controls.formula.clearValidators();
    computation.controls.formula.enable();

    if (!init) {
      // Updating the formula in function of the type
      if (type.value === 'fixed' && (isNaN(computation.value.formula) || computation.value.formula === null)) {
        computation.controls.formula.setValue('0');
      }
      else if (type.value === 'copy') {
        computation.controls.formula.setValue(COPY_FORMULA);
      }
      else if (type.value === 'percentage') {
        computation.controls.formula.setValue(PERCENTAGE_FORMULA);
      }
      else if (type.value === 'permille') {
        computation.controls.formula.setValue(PERMILLE_FORMULA);
      }
      else if (type.value === 'unavailable') {
        computation.controls.formula.setValue(null);
      }
      else if (type.value === 'formula'){
        computation.controls.formula.setValue(CUSTOM_FORMULA);
      }
    }

    if (type.value === 'fixed' || type.value === 'formula') {
      computation.controls.formula.setValidators(Validators.required);
    } else {
      computation.controls.formula.disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
