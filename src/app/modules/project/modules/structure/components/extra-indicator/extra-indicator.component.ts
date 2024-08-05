import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  @Input() notConfigured = false;
  @Input() disabled = false;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
