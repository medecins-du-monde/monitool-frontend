import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Theme, ThemeType } from 'src/app/models/classes/theme.model';
import { ForceTranslateService } from 'src/app/services/forcetranslate.service';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit, OnDestroy {

  themeForm: UntypedFormGroup;

  displayedColumns = ['language', 'shortName', 'name'];

  languages = ['fr', 'en', 'es'];
  dictionary = {};

  type: ThemeType = 'theme'

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private forceTranslateService: ForceTranslateService,
    public dialogRef: MatDialogRef<ThemeModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Theme
  ) {
    if (this.router.url.includes('required')) {
      this.type = 'requiredTheme';
    }
  }

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
      type: this.data ? this.data.type : this.type,
      _rev: this.data ? this.data.rev : null
    });

    this.languages.forEach(language => {
      this.subscription.add(
        this.forceTranslateService.getData(language).subscribe( data => {
          this.dictionary[`${language}`] = data;
        })
      );
    });
  }

  onSubmit() {
    const theme = new Theme(this.themeForm.value);
    this.dialogRef.close({ data: theme });
  }

  getLanguageDictionary(language: string) {
    return this.dictionary[`${language}`];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
