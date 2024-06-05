import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';

@Component({
  selector: 'app-extra-indicator',
  templateUrl: './extra-indicator.component.html',
  styleUrls: ['./extra-indicator.component.scss']
})
export class ExtraIndicatorComponent implements OnInit {

  @Input() deletable = true;
  @Input() extraIndicator: ProjectIndicator;
  @Input() reset = false;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
