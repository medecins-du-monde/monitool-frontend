import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent {

  @Input() form: Form;
  @Input() project: Project;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  public allOption: Group = new Group({id:'all', name: 'All'})
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
    let groups = this.project.groups.filter(g => {
      for(let member of g.members){
        if (!this.form.entities.includes(member) ){
          return false;
        }
      }
      return true;
    })

    return groups;
  }

  private filterEntities(): Entity[] {
    let entities = [...this.form.entities];

    for (let group of this.groups){
      entities = entities.filter( e => !group.members.includes(e) );
    }
    
    return entities;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.allOption.members = this.form.entities;
    this.groups = this.getGroupsSelected();
    this.entities = this.filterEntities()
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

}
