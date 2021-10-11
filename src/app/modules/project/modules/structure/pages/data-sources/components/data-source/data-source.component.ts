import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Form } from 'src/app/models/classes/form.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
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
  public allOption: Group = new Group({id: 'all', name: 'All'});
  groups: Group[];
  entities: Entity[];

  private getGroupsSelected(){
    if (this.form === null || this.form.entities === null){
      return [];
    }

    // if all entities are selected, just return the allOption
    if (this.form.entities.length === this.project.entities.length){
      return [this.allOption];
    }

    // get the groups that have all members selected
    const groups = this.project.groups.filter(g => {
      for (const member of g.members){
        if (!this.form.entities.includes(member) ){
          return false;
        }
      }
      return true;
    });

    return groups;
  }

  private filterEntities(): Entity[] {
    let entities = [...this.form.entities];

    for (const group of this.groups){
      entities = entities.filter( e => !group.members.includes(e) );
    }

    return entities;
  }

  constructor(private translateService: TranslateService, private dialog: MatDialog, private projectService: ProjectService,) { }

  ngOnInit(): void {
    this.allOption.members = this.form.entities;
    this.groups = this.getGroupsSelected();
    this.entities = this.filterEntities();
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get landscapePdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/data-source/${this.form.id}.pdf?orientation=landscape&language=${this.currentLang}`;
  }

  get portraitPdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/data-source/${this.form.id}.pdf?orientation=portrait&language=${this.currentLang}`;
  }

  onEdit() {
    this.edit.emit(this.form);
  }

  onDelete() {
    this.delete.emit(this.form);
  }

  onClone(form) {
    console.log('FUCK', form);
    const newForm = new Form();
    newForm.name = 'Clone - ' + form.name;
    newForm.end = form.end;
    newForm.periodicity = form.periodicity;
    newForm.start = form.start;
    newForm.entities = form.entities;

    form.elements.forEach(el => {
      const newElement = new FormElement();
      newElement.distribution = el.distribution;
      newElement.geoAgg = el.geoAgg;
      newElement.name = el.name;
      newElement.partitions = el.partitions;
      newElement.timeAgg = el.timeAgg;
      newForm.elements.push(newElement);
    });

    this.project.forms.push(newForm);
    this.projectService.project.next(this.project);
  }

}
