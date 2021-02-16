import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { ForceTranslateService } from 'src/app/services/forcetranslate.service';
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
  dictionary: [];

  testString: string = "testing forceTranslate";

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
      _rev: this.data ? this.data.rev : null
    });
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
      if (this.data) {
        this.indicatorForm.controls.themes.setValue(this.themes.filter(x => this.data.themes.map(t => t.id).includes(x.id)));
      }
    });    
    this.dictionary = [];
    this.forceTranslateService.getData('fr').subscribe( data => { this.dictionary['fr'] = data; });
    this.forceTranslateService.getData('en').subscribe( data => { this.dictionary['en'] = data; });
    this.forceTranslateService.getData('es').subscribe( data => { this.dictionary['es'] = data; });
  }

  forceTranslate(lang: string, text:string){
    let x = text.split('.');
    let result = this.dictionary[lang];
    text.split('.').forEach(element => {
      result = result[element];
    });
    return result;
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
