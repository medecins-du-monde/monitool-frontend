import { Component, Inject, inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent {

  public allOption: Group = new Group({id: 'all', name: 'All'});
  groups: Group[];
  entities: Entity[];
  paramaters: any[];
  thematics: string[];
  start: Date;
  end: Date;
  aggregation: any;

  private disaggregationElements = {};
  private disaggregationElementPartitions = {};

  get currentLang(): string {
    return this.translateService.currentLang
      ? this.translateService.currentLang
      : this.translateService.defaultLang;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'logicalFrame' | 'crossCutting' | 'form' | 'formData' | 'extraIndicator' | 'logicalFrameIndicator',
      details: any,
      indicator: boolean,
      project: Project
    },
    private indicatorService: IndicatorService,
    private translateService: TranslateService
  ) {
    if (data.project) {
      this.disaggregationElements = this.getProjectElements();
      Object.keys(this.disaggregationElements).forEach(key => {
        this.disaggregationElementPartitions = {...this.disaggregationElementPartitions, ...this.disaggregationElements[key].partitions}
      })
    }

    const isDisag = this.data.details && this.data.details.disaggregatedBy && Object.keys(this.data.details.disaggregatedBy).length > 0;

    switch (this.data.type) {
      case 'logicalFrame':
      case 'form':
        this.groups = this.getGroupsSelected();
        this.entities = this.filterEntities();
        this.start = data.details.start ? data.details.start : data.project.start;
        this.end = data.details.end ? data.details.end : data.project.end;
        break;

      case 'logicalFrameIndicator':
      case 'extraIndicator':
        this.getParameters();
        break;

      case 'crossCutting':
        this.getParameters();
        this.getCrossCuttingThematics();
        break;

      case 'formData':
        if (isDisag) {
          this.aggregation = this.disaggregationElementPartitions[_.last(Object.keys(data.details.disaggregatedBy))];
          this.data.type += 'Disag'
        }
        break;

      default:
        break;
    }
  }

  public hasProperty(object: object, prop: string) {
    return _.has(object, prop)
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
    if (this.data.details && this.data.details.id) {
      this.thematics = [];
      this.indicatorService.get(this.data.details.id).then(res => {
        this.data.details['name'] = res.name[this.currentLang];
        this.thematics = res.themes.map(theme => theme.name[this.currentLang]);
      });
    }
  }

  private getProjectElements(): any {
    let elements = {};
    this.data.project.forms.forEach(form => {
      elements = {...elements, ...Object.fromEntries(form.elements.map(el => [el.id, {
        parent: form.name,
        name: el.name,
        partitions: Object.fromEntries(el.partitions.map(part => [part.id, {
          name: part.name,
          elements: Object.fromEntries(part.elements.map(el2 => [el2.id, el2.name])),
          aggregation: part.aggregation,
        }]))
      }]))}
    })
    return elements;
  }

  private getParameters() {
    if (this.data.details.computation) {
      const parameterKeys = Object.keys(this.data.details.computation.parameters);
      if (parameterKeys.length > 0) {
        const elements = this.disaggregationElements;
        this.paramaters = parameterKeys.map(key => {
          const simpleParam = this.data.details.computation.parameters[key];
          const element = elements[simpleParam.elementId];
          return {
            var: key,
            name: element.name,
            parent: element.parent,
            disag: Object.keys(simpleParam.filter).map(id => {
              const disagElements = [];
              Object.keys(element.partitions[id].elements).forEach(elPartition => {
                if (simpleParam.filter[id].find(elFilter => elFilter === elPartition)) {
                  disagElements.push(element.partitions[id].elements[elPartition])
                }
              })
              return {
                name: element.partitions[id].name,
                elements: disagElements,
                all: disagElements.length === Object.keys(element.partitions[id].elements).length
              }
            })
          }
        })
      }
    }
  }
}
