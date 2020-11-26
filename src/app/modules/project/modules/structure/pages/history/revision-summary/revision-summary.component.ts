import { Component, OnInit, Input } from '@angular/core';
import { Revision } from 'src/app/models/revision.model';
import * as jsonpatch from 'fast-json-patch';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Operation } from 'fast-json-patch';
import { transcode } from 'buffer';


@Component({
  selector: 'app-revision-summary',
  templateUrl: './revision-summary.component.html',
  styleUrls: ['./revision-summary.component.scss'],
})

export class RevisionSummaryComponent implements OnInit {

  @Input() revision: Revision;
  @Input() revisions: Revision[];
  @Input() index: number;

  output = [];
  project: Project = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {

    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
    });

    let before = this.patchProject(this.index);
    let after = this.patchProject(this.index);

    this.revision.forwards.forEach( revision => {
      const operation = revision;
      after = jsonpatch.applyOperation(after, operation as Operation).newDocument;
      const key = this.getTranslationKey(operation);
      let data = this.getTranslationData(operation, before, after);

      if (key) {
        data['translationKey'] = key;
        this.output.push(data);
      }

      before = jsonpatch.applyOperation(before, operation as Operation).newDocument;
    });
  }

  getTranslationKey(operation) {
    let editedField = operation.path
      .substring(1) // Remove leading slash
      .replace(/\/\d+\//g, '_') // Remove indexes and ids that are in the middle
      .replace(/\/[a-z]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\//, '_')
      .replace(/\/\d+$/, '')
      .replace(/\/[a-z]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, '');	// Remove trailing numbers and trailing uuids

    // Special case for indicators: we do as if all logframe indicators were on the general objective.
    const indicatorMatch = editedField.match(/^logicalFrames.*indicators(.*)$/);
    if (indicatorMatch) {
      editedField = 'logicalFrames_indicators' + indicatorMatch[1];
    }

    // All computation changes in indicators are simplified to be complete replacement.
    const computationMatch = editedField.match('^(.*)_computation');
    if (computationMatch) {
      // truncate everything after computation
      editedField = computationMatch[1] + '_computation';
      editedField = editedField + '_replace';
    }
    else {
      editedField = editedField + '_' + operation.op;
    }

    return 'HistoryRevision.' + editedField;
  }

  getTranslationData(operation, before, after) {
    const editedField = operation.path.substring(1).replace(/\/\d+\//g, '_').replace(/\/\d+$/, '');
    const splitPath = operation.path.split('/').slice(1);
    const translationData = {};
    let currentItem = before;

    for (let j = 1; j < splitPath.length - 1; j += 2) {
      let name = splitPath[j - 1];
      const id = splitPath[j];
      currentItem = currentItem[name][id];

      if (name === 'entities') { // This is just to avoid writing "entitie" in the translation strings
        name = 'entity';
      }
      else if (name === 'elements' && j < 5) { // Avoid name collision between form and partition elements
        name = 'variable';
      }
      else { // we can have the singular by removing the trailing 's' (i.e. logicalFrames => logicalFrame)
        name = name.substring(0, name.length - 1);
      }
      translationData[name] = currentItem;
    }


    //////////////////////////
    // Get the actual item that got modified.
    // For replace operations, we define both the "before" and "after" keys
    // Otherwise, just the "item".
    //////////////////////////


    if (operation.op === 'add') {
      translationData['item'] = operation.value;
    }
    else if (operation.op === 'replace') {
      translationData['after'] = operation.value;
      translationData['before'] = before;
      for (var j = 0; j < splitPath.length; j += 1) {
        translationData['before'] = translationData['before'][splitPath[j]];
      }
      if (translationData['before'] instanceof Date) {
        translationData['before'] = this.transformDate(translationData['before']);
      }
    }
    else if (operation.op === 'remove') {
      translationData['item'] = before;
      for (let j = 0; j < splitPath.length; j += 1) {
        translationData['item'] = translationData['item'][splitPath[j]];
      }
    }
    else if (operation.op === 'move') {
      translationData['item'] = before;
      const splitpath2 = operation.from.split('/').slice(1);
      for (let j = 0; j < splitpath2.length; j += 1) {
        translationData["item"] = translationData['item'][splitpath2[j]];
      }
    }

    //////////////////////////
    // When the modification is adding or removing ids that refer to something else, we
    // replace the id by the actual value it refers to, to allow proper printing
    // i.e. Avoid "Added 347b57e7-a8e0-441c-a673-419b2aefb6f8 to sites in form x"
    //////////////////////////

    if (operation.op === 'add' || operation.op === 'remove') {
      if (editedField === 'users_dataSources') {
        translationData['item'] = before.forms.find(e => e.id === translationData['item']);
      }
      if (['groups_members', 'forms_entities', 'users_entities', 'logicalFrames_entities'].includes(editedField)) {
        translationData['item'] = before.entities.find(e => e.id === translationData['item']);
      }
      if (editedField === 'forms_elements_partitions_groups_members') {
        translationData['item'] = translationData['partition']['elements'].find(e => e.id == translationData['item']);
      }
    }

    return translationData;

  }

  patchProject(revisionIndex) {
    let revisedProject = this.project.copy();
    for (let i = 1; i <= revisionIndex; i++) {
      const patch = this.revisions[i].backwards;
      const test = jsonpatch.applyPatch(revisedProject, patch as Operation[]).newDocument;
    }
    return revisedProject;
  }

  transformDate(date) {
      return date.getFullYear() + '-' +  (date.getMonth()+1) + '-' +  date.getDate();
  }


}
