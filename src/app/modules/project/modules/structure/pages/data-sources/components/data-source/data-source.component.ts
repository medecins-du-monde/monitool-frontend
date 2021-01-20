import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  @Input() form: Form;
  @Input() project: Project;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get landscapePdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/data-source/${this.form.id}.pdf?orientation=landscape&language=${this.currentLang}`;
  }

  get portraitPdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/data-source/${this.form.id}.pdf?orientation=portrait&language=${this.currentLang}`;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit(this.form);
  }

  onDelete() {
    this.delete.emit(this.form);
  }

}
