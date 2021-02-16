import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Theme } from 'src/app/models/classes/theme.model';
import { ForceTranslateService } from 'src/app/services/forcetranslate.service';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit {

  themeForm: FormGroup;

  displayedColumns = ['language', 'shortName', 'name'];

  languages = ['fr', 'en', 'es'];
  dictionary: [];

  constructor(
    private fb: FormBuilder,
    private forceTranslateService: ForceTranslateService,
    public dialogRef: MatDialogRef<ThemeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Theme
  ) { }

  ngOnInit(): void {
    this.themeForm = this.fb.group({
      _id: this.data ? this.data.id : null,
      name: this.fb.group({
        en: [this.data ? this.data.name.en : '', Validators.required],
        es: [this.data ? this.data.name.es : '', Validators.required],
        fr: [this.data ? this.data.name.fr : '', Validators.required]
      }),
      shortName: this.fb.group({
        en: [this.data ? this.data.shortName.en : '', Validators.required],
        es: [this.data ? this.data.shortName.es : '', Validators.required],
        fr: [this.data ? this.data.shortName.fr : '', Validators.required]
      }),
      _rev: this.data ? this.data.rev : null
    });
    console.log(this.data);
    this.dictionary = [];
    this.forceTranslateService.getData('fr').subscribe( data => { this.dictionary['fr'] = data; });
    this.forceTranslateService.getData('en').subscribe( data => { this.dictionary['en'] = data; });
    this.forceTranslateService.getData('es').subscribe( data => { this.dictionary['es'] = data; });
  }

  onSubmit() {
    const theme = new Theme(this.themeForm.value);
    this.dialogRef.close({ data: theme });
  }

  forceTranslate(lang: string, text:string){
    let x = text.split('.');
    let result = this.dictionary[lang];
    text.split('.').forEach(element => {
      result = result[element];
    });
    return result;
  }

}
