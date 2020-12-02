import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-extra-indicator',
  templateUrl: './extra-indicator.component.html',
  styleUrls: ['./extra-indicator.component.scss']
})
export class ExtraIndicatorComponent implements OnInit {

  @Input() deletable = true;
  @Input() extraIndicator: ProjectIndicator;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
