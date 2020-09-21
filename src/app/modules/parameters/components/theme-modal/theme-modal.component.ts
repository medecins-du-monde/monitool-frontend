import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit {

  themeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.themeForm = this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        es: ['', Validators.required],
        fr: ['', Validators.required]
      }),
      shortName: this.fb.group({
        en: ['', Validators.required],
        es: ['', Validators.required],
        fr: ['', Validators.required]
      })
    });
  }

}
