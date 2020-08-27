import { Component, OnInit, Input } from '@angular/core';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @Input() theme: Theme;
  constructor() { }

  ngOnInit(): void {
  }

}
