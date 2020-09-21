import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input() theme: Theme;

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onDelete(): void {
    this.delete.emit(this.theme.id);
  }
}
