import { Component, Inject, inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent {

  public allOption: Group = new Group({id: 'all', name: 'All'});
  groups: Group[];
  entities: Entity[];
  thematics: string[];

  get currentLang(): string {
    return this.translateService.currentLang
      ? this.translateService.currentLang
      : this.translateService.defaultLang;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'logicalFrame' | 'crossCutting' | 'form',
      details: any,
      project: Project
    },
    private indicatorService: IndicatorService,
    private translateService: TranslateService
  ) {
    console.log(data);
    if (this.data.type === 'logicalFrame' || this.data.type === 'form') {
      this.groups = this.getGroupsSelected();
      this.entities = this.filterEntities();
    } else {
      this.thematics = [];
      this.getCrossCuttingThematics();
    }
  }

  private getGroupsSelected(){
    if (this.data.details === null || this.data.details.entities === null){
      return [];
    }

    // if all entities are selected, just return the allOption
    if (this.data.details.entities.length === this.data.project.entities.length){
      return [this.allOption];
    }

    // get the groups that have all members selected
    const groups = this.data.project.groups.filter(g => {
      for (const member of g.members){
        if (!this.data.details.entities.includes(member) ){
          return false;
        }
      }
      return true;
    });

    return groups;
  }

  private filterEntities(): Entity[] {
    let entities = [...this.data.details.entities];

    for (const group of this.groups){
      entities = entities.filter( e => !group.members.includes(e) );
    }

    return entities;
  }

  private getCrossCuttingThematics() {
    this.indicatorService.get(this.data.details.id).then(res => {
      this.data.details['name'] = res.name[this.currentLang];
      this.thematics = res.themes.map(theme => theme.name[this.currentLang]);
    });
  }
}
