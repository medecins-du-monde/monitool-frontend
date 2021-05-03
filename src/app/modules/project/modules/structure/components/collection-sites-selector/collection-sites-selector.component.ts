import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';

@Component({
  selector: 'app-collection-sites-selector',
  templateUrl: './collection-sites-selector.component.html',
  styleUrls: ['./collection-sites-selector.component.scss']
})
export class CollectionSitesSelectorComponent implements OnInit, OnDestroy {

  public allOption: Entity = new Entity({id: 'all', name: 'All'});

  @Input() form: FormGroup;
  @Input() entities = [];
  @Input() groups = [];
  @Input() hint = false;

  private subscription: Subscription = new Subscription();
  constructor() { }


  private getGroupedEntities(){
    if (this.form === null || this.form.controls.entities.value === null){
      return [];
    }
    // if all entities are selected, just return all the options selected
    if (this.form.controls.entities.value.length === this.entities.length){
      return [...this.entities, ...this.groups, this.allOption];
    }

    // get the groups that have all members selected
    const groups = this.groups.filter(g => {
      for (const member of g.members){
        if (!this.form.controls.entities.value.includes(member) ){
          return false;
        }
      }
      return true;
    });

    return [ ...groups, ...this.form.controls.entities.value ];
  }

  ngOnInit(): void {
    this.form.controls.entities.setValue(this.getGroupedEntities());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get selectedEntities(): Entity[] {
    if (this.form.controls.entities.value === null){
      return [];
    }

    let entities = [...this.form.controls.entities.value];

    // if the 'allOption' is selected it should be the only one displayed
    if (entities && entities.includes(this.allOption)){
      return [this.allOption];
    }

    // if a group is selected, we don't show it's members
    for (const group of entities){
      if (group instanceof Group){
        entities = entities.filter(e => !group.members.includes(e));
      }
    }

    return entities;
  }

  onEntityRemoved(entity): void {
    const currentEntities = this.form.controls.entities;
    const entities = this.form.controls.entities.value;
    if (entity === this.allOption){
      this.form.controls.entities.setValue([]);
    }else if (this.groups.find(g => g.id === entity.id)){
      const newValue = currentEntities.value.filter(x => x.id !== entity.id);
      const entitiesBelongingToGroups = [];
      for (const group of newValue){
        if (group instanceof Group){
          for (const member of group.members){
            if (!entitiesBelongingToGroups.includes(member)){
              entitiesBelongingToGroups.push(member);
            }
          }
        }
      }

      currentEntities.setValue(
        newValue.filter(e => e.id !== this.allOption.id
          && !(e instanceof Entity && entity.members.includes(e)
          && !entitiesBelongingToGroups.includes(e)))
      );
    }
    else{
      this.form.controls.entities.setValue(currentEntities.value.filter(x => x.id !== entity.id));
    }
  }

  toggleAllSelection(): void{
    const currentEntities = this.form.controls.entities;

    // when the 'all' option is selected we select all the others too
    if (currentEntities.value.includes(this.allOption)){
      currentEntities.setValue([...this.entities, ...this.groups, this.allOption]);
    }
    // when it its unselected we remove all the others
    else{
      currentEntities.setValue([]);
    }
  }


  toggleNormalOption(entityClicked: Entity){
    const currentEntities = this.form.controls.entities;
    // this means it is selecting a new option
    if (currentEntities.value.includes(entityClicked)){
      // if selecting this option make we have all entities selected we must add the 'allOption' and all the groups
      if (currentEntities.value.filter(e => e instanceof Entity).length === this.entities.length){
        currentEntities.setValue([...currentEntities.value, ...this.groups, this.allOption]);
      }else{
        // we need to add all the groups that have all members selected
        currentEntities.setValue([...currentEntities.value, ...this.groups.filter(g => !currentEntities.value.includes(g)).filter(g => {
          for (const member of g.members){
            // if one member is not present we can return false and the group won't be selected
            if (!currentEntities.value.includes(member)){
              return false;
            }
          }
          return true;
        })]);
      }
    }
    // this means we are deselecting an option
    else{
      // if the 'allOption' is selected and we click on a normal option, we have to remove the 'allOption'
      const newOptions = currentEntities.value.filter((e) => {
        return e.id !== this.allOption.id &&
        // and also remove the groups that have that option as a member
        !(e instanceof Group && e.members.includes(entityClicked));
      });
      currentEntities.setValue(newOptions);
    }
  }


  toggleGroupOption(group: Group){
    const currentEntities = this.form.controls.entities;

    // adding a new group
    if (currentEntities.value.includes(group)){
      // add all members of that group that are not selected already
      const entitiesToBeAdded = this.entities.filter((e: Entity) => group.members.includes(e));

      // add allOption if necessary
      let newValues = currentEntities.value.concat(entitiesToBeAdded.filter(e => !currentEntities.value.includes(e)));
      if (newValues.filter(e => this.entities.includes(e)).length === this.entities.length){
        newValues = [...this.entities, ...this.groups, this.allOption];
      }
      else{
        // add all the groups that have all members selected
        const newGroups = this.groups.filter(g => {
          if (newValues.includes(g)){
            return false;
          }
          for (const member of g.members){
            if (!newValues.includes(member)){
              return false;
            }
          }
          return true;
        });
        newValues = newValues.concat(newGroups);
      }
      currentEntities.setValue(newValues);
    }
    // removing a group
    else{
      const entitiesBelongingToGroups = [];
      for (const entityGroup of currentEntities.value){
        if (entityGroup instanceof Group){
          for (const member of entityGroup.members){
            if (!entitiesBelongingToGroups.includes(member)){
              entitiesBelongingToGroups.push(member);
            }
          }
        }
      }
      currentEntities.setValue(
        currentEntities.value.filter(e => e.id !== this.allOption.id
          && !(e instanceof Entity && group.members.includes(e)
          && !entitiesBelongingToGroups.includes(e)))
      );
    }
  }
}

