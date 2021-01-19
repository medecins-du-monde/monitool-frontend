import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logical-frame',
  templateUrl: './logical-frame.component.html',
  styleUrls: ['./logical-frame.component.scss']
})
export class LogicalFrameComponent implements OnInit {

  @Input() logicalFrame: LogicalFrame;
  @Input() project: Project;
  @Output() clone = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get landscapePdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/logical-frame/${this.logicalFrame.id}.pdf?orientation=landscape&language=${this.currentLang}`;
  }

  get portraitPdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/logical-frame/${this.logicalFrame.id}.pdf?orientation=portrait&language=${this.currentLang}`;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {}

  onClone() {
    this.clone.emit(this.logicalFrame);
  }

  onEdit() {
    this.edit.emit(this.logicalFrame);
  }

  onDelete() {
    this.delete.emit(this.logicalFrame);
  }

}
