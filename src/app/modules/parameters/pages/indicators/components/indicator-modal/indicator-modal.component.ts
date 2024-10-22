import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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

  @ViewChild('warningModal') warningModal: TemplateRef<any>;

  warningDialogRef: MatDialogRef<any>;

  indicatorForm: UntypedFormGroup;

  languages = ['fr', 'en', 'es'];

  themes: Theme[];

  dictionary = {};

  dataChanged = false;

  prevForm;

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
    private fb: UntypedFormBuilder,
    private translateService: TranslateService,
    private forceTranslateService: ForceTranslateService,
    private themeService: ThemeService,
    public dialogRef: MatDialogRef<IndicatorModalComponent>,
    private dialog: MatDialog,
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
        const themes = this.themes.filter(x => this.data.themes.map(t => t.id).includes(x.id));
        // Set the original of prevForm;
        if (!this.prevForm) {
          this.prevForm = this.indicatorForm.value;
          this.prevForm.themes = themes;
        }
        this.indicatorForm.controls.themes.setValue(themes);
      }
    });

    this.languages.forEach(language => {
      this.subscription.add(
        this.forceTranslateService.getData(language).subscribe( data => {
          this.dictionary[`${language}`] = data;
        })
      );
    });

    this.onTypeChange({value: this.indicatorForm.value.computation.type}, true);

    this.subscription.add(
      this.indicatorForm.valueChanges.subscribe((res) => {
        if (JSON.stringify(res) === JSON.stringify(this.prevForm)) {
          this.dataChanged = false;
        } else {
          this.dataChanged = true;
        }
      })
    );
  }

  getLanguageDictionary(language: string) {
    return this.dictionary[`${language}`];
  }

  onSubmit() {
    const computation = this.indicatorForm.controls.computation as UntypedFormGroup;
    computation.controls.formula.enable();
    computation.controls.formula.patchValue(String(computation.value.formula));
    const indicator = new Indicator(this.indicatorForm.value);
    // Show warning for indicators using prev formula
    if (
      this.data && // Is not a new indicator
      this.data.computation && // Legacy indicators don't have a formula.
      this.data.computation.type !== 'unavailable' && // If formula was unavailable, no indicator could be configured.
      this.data.computation.formula !== indicator.computation.formula) {
        this.warningDialogRef = this.dialog.open(this.warningModal);
        this.warningDialogRef.afterClosed().subscribe((res) => {
          if (res) {
            this.dialogRef.close({ data: indicator });
          }
        });

    } else {
      this.dialogRef.close({ data: indicator });
    }
  }
  onThemeRemoved(theme: Theme) {
    const themes = this.indicatorForm.controls.themes.value;
    this.indicatorForm.controls.themes.setValue(themes.filter(t => t.id !== theme.id));
  }

  onTypeChange(type: any, init = false): void {
    const computation = this.indicatorForm.controls.computation as UntypedFormGroup;

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
