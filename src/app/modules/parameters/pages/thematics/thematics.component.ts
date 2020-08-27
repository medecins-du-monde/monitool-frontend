import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme';
import { themes } from 'src/app/constants/themes';
@Component({
  selector: 'app-thematics',
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent implements OnInit {
  themes: Theme[];
  constructor() { }

  ngOnInit(): void {
    this.themes = themes;
  }

}
