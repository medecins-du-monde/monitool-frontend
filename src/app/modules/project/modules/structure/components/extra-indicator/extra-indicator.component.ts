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
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  ngOnInit(): void {
    console.log('computation', this.extraIndicator.computation)
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
