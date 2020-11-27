import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit {

  themeForm: FormGroup;

  displayedColumns = ['language', 'shortName', 'name'];

  languages = ['fr', 'en', 'es'];

  constructor(
    private fb: FormBuilder,
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
  }

  onSubmit() {
    const theme = new Theme(this.themeForm.value);
    this.dialogRef.close({ data: theme });
  }

}
