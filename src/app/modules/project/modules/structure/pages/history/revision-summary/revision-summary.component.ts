import { Component, OnInit, Input } from '@angular/core';
import { Revision } from 'src/app/models/revision.model';
import * as jsonpatch from 'fast-json-patch';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';


@Component({
  selector: 'app-revision-summary',
  templateUrl: './revision-summary.component.html',
  styleUrls: ['./revision-summary.component.scss'],
})

export class RevisionSummaryComponent implements OnInit {


  @Input() revision: Revision;


  forward = [];
  backwards = [];
  output: string[] = [];
  project: Project = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {


    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
    });

    let before = this.project.copy();
    let after = this.project.copy();

    this.revision.forwards.forEach( revision => {
      let operation = revision;

      //after = jsonpatch.applyOperation(after, operation as Operation[]);
      let key = this.getTranslationKey(operation);
      let data = this.getTranslationData(operation, before, after);

      if (key) {
        this.output.push(key);
      }
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

    return 'project.history.' + editedField;
  }

  getTranslationData(operation, before, after) {
    let editedField = operation.path.substring(1).replace(/\/\d+\//g, '_').replace(/\/\d+$/, '');
    let splitPath = operation.path.split('/').slice(1);
    let translationData = {};
    
    let currentItem = this.project.copy();


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
      translationData[name] = currentItem.name;

    }





  }


}
