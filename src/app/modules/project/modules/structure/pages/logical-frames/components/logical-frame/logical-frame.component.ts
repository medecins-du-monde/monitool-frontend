import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
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
  public allOption: Group = new Group({id:'all', name: 'All'})
  groups: Group[];
  entities: Entity[];


  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get landscapePdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/logical-frame/${this.logicalFrame.id}.pdf?orientation=landscape&language=${this.currentLang}`;
  }

  get portraitPdfUrl() {
    return `${environment.API_URL}/resources/project/${this.project.id}/logical-frame/${this.logicalFrame.id}.pdf?orientation=portrait&language=${this.currentLang}`;
  }

  private getGroupsSelected(){ 
    if (this.logicalFrame === null || this.logicalFrame.entities === null){
      return [];
    }
    
    // if all entities are selected, just return the allOption
    if (this.logicalFrame.entities.length === this.project.entities.length){
      return [this.allOption];
    }
  
    // get the groups that have all members selected
    let groups = this.project.groups.filter(g => {
      for(let member of g.members){
        if (!this.logicalFrame.entities.includes(member) ){
          return false;
        }
      }
      return true;
    })

    return groups;
  }

  private filterEntities(): Entity[] {
    let entities = [...this.logicalFrame.entities];

    for (let group of this.groups){
      entities = entities.filter( e => !group.members.includes(e) );
    }
    
    return entities;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.allOption.members = this.logicalFrame.entities;
    this.groups = this.getGroupsSelected();
    this.entities = this.filterEntities()
  }
  

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
