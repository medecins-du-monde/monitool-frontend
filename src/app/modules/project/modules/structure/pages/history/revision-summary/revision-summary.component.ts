/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Revision } from 'src/app/models/classes/revision.model';
import * as jsonpatch from 'fast-json-patch';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Operation } from 'fast-json-patch';
import { Form } from 'src/app/models/classes/form.model';
import * as _ from 'lodash';
import { isEqual, uniqWith } from 'lodash';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { CountryListService } from 'src/app/services/country-list.service';


@Component({
  selector: 'app-revision-summary',
  templateUrl: './revision-summary.component.html',
  styleUrls: ['./revision-summary.component.scss'],
})

export class RevisionSummaryComponent implements OnInit, OnDestroy {

  @Input() revision: Revision;
  @Input() revisions: Revision[];
  @Input() index: number;

  output = [];
  project: Project = null;

  get currentLang() {
    return this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang;
  }

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService, private translate: TranslateService, private countryListService: CountryListService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
      })
    );
    this.subscription.add(
      this.translate.onLangChange.subscribe((lang: any) => {
        this.translateElements(this.output);
      })
    );
    this.createDynamicRevisionText();
    this.output = uniqWith(this.output, isEqual);
    this.output = uniqWith(this.output, (a, b) => {
      const keyA = a['translationKey'];
      const keyB = b['translationKey'];
      if (keyA !== keyB) { return false; }

      const uniqueKeys = ['HistoryRevision.users_move'];
      return uniqueKeys.includes(keyA);
    });
  }


  createDynamicRevisionText(): void {
    let before = this.patchProject(this.index + 1);
    let after = this.patchProject(this.index);
    after = jsonpatch.applyPatch(after, this.revisions[this.index].backwards as Operation[]).newDocument;
    after.forms = after.forms.map(y => new Form(y));

    // loop through revision of element and apply datatransformation to create table input
    this.revision.forwards.forEach(rev => {
      const operation = rev;
      const key = this.getTranslationKey(operation);
      let data;

      if (this.index === 0) {
        data = this.getTranslationData(operation, after, after);
      } else {
        data = this.getTranslationData(operation, before, after);
      }

      if (key) {
        data.translationKey = key;
        // Simplify the comments to only show 'updated comment'
        // Check if there is already a key starting with 'HistoryRevision.comments'
        if (key.startsWith('HistoryRevision.comments')) {
          if (data.item && Array.isArray(data.item)) {
            data.item.map(item => {
              this.output.push(this.setCommentHistory({...data, item}, operation, after));
            });
          } else {
            this.output.push(this.setCommentHistory(data, operation, after));
          }
        } else { this.output.push(data); }
      }

      before = jsonpatch.applyOperation(before, operation as Operation).newDocument;
      before.forms = before.forms.map(y => new Form(y));
    });

    this.translateElements(this.output);
  }

  getTranslationKey(operation): string {
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

    // Get the actual item that got modified.
    if (operation.value?.type) {
      if (operation.value.type === 'partner') {
        operation.value['id'] = operation.value.name;
      }
    }

    this.translateLocation(before);
    this.translateLocation(after);
    if (operation.value) {
      if (editedField === 'continent' && this.countryListService.getContinent(operation.value)) {
        operation.value = this.countryListService.getContinent(operation.value)[this.currentLang];
      }
      if (editedField === 'country' && this.countryListService.getCountry(operation.value)) {
        operation.value = this.countryListService.getCountry(operation.value)[this.currentLang];
      }
    }

    if (operation.op === 'add') {
      translationData['item'] = operation.value;

    }
    else if (operation.op === 'replace') {
      if (operation.value == null) { translationData['after'] = ['null']; }
      else { translationData['after'] = operation.value; }
      translationData['before'] = before;

      splitPath.forEach(path => translationData['before'] = translationData['before'][path]);
      if (translationData['before'] instanceof Date) {
        translationData['before'] = this.transformDate(translationData['before']);
      }
    }
    else if (operation.op === 'remove') {
      translationData['item'] = after;
      splitPath.forEach(path => {
        if (translationData['item']) {
          translationData['item'] = translationData['item'][path];
        }

      });

    }
    else if (operation.op === 'move') {
      translationData['item'] = before;
      const splitpath2 = operation.from.split('/').slice(1);
      splitpath2.forEach(path => translationData['item'] = translationData['item'][path]);
    }

    // In case we needed an item but it was not defined yet (in our framework we currently don't default values for some)
    if (!translationData['item']) {
      translationData['item'] = '';
    }

    //////////////////////////
    // When the modification is adding or removing ids that refer to something else, we
    // replace the id by the actual value it refers to, to allow proper printing
    // i.e. Avoid "Added 347b57e7-a8e0-441c-a673-419b2aefb6f8 to sites in form x"
    //////////////////////////

    if (operation.op === 'add' || operation.op === 'remove') {

      if (editedField === 'users_dataSources') {

        translationData['item'] = before.forms.find(e => {

          if (Array.isArray(translationData['item'])) {
            return e.id === translationData['item'][0];
          }
          else {
            return e.id === translationData['item'];
          }
        });

      }
      if (editedField === 'users' && operation.op === 'remove') {
        translationData['item']['id'] = translationData['item']['id'] || translationData['item']['name'];
      }
      if (['groups_members', 'forms_entities', 'users_entities', 'logicalFrames_entities'].includes(editedField)) {

        translationData['item'] = before.entities.find(e => {

          if (Array.isArray(translationData['item'])) {
            return e.id === translationData['item'][0];
          }
          else {
            return e.id === translationData['item'];
          }
        });

      }

      if (editedField === 'forms_elements_partitions_groups_members') {
        translationData['item'] = translationData['partition']['elements'].find(e => {
          if (Array.isArray(translationData['item'])) {
            return e.id === translationData['item'][0];
          }
          else {
            return e.id === translationData['item'];
          }
        });
      }
    }
    if (typeof translationData['before'] === 'object')
    {
      translationData['before'] = 'null';
    }
    return translationData;

  }

  patchProject(revisionIndex): Project {
    const revisedProject = _.cloneDeep(this.project);
    for (let i = 0; i < revisionIndex; i++) {
      try {
        const patch = this.revisions[i].backwards as Operation[];
        jsonpatch.applyPatch(revisedProject, patch);
      } catch (e) {
        console.log('Error in reverting to datasource at Index ', i);
        console.log(e);
      }
    }

    revisedProject.forms = revisedProject.forms.map(y => new Form(y));
    return revisedProject;
  }

  transformDate(date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  setCommentHistory(data, operation, project): any {

    let locationArray = [];
    let location = '';

    // Gets the path for data without it
    const commentId = Number(operation.path.split('/')[2]);
    let commentPath = '';
    if (project.comments && project.comments[commentId] && project.comments[commentId].path) {
      commentPath = project.comments[commentId].path;
    }

    // Formats the comments locations array
    if (data.comment && data.comment.path) {
      locationArray = data.comment.path.split(/:|\|/);
    } else if (data.item && data.item.path) {
      locationArray = data.item.path.split(/:|\|/);
    } else {
      locationArray = commentPath.split(/:|\|/);
    }


    // Sets the location variable
    if (locationArray.length > 0) {
      let parentElement: any = this.project;

      for (let i = 0; locationArray[i] && parentElement; i += 2) {
        switch (true) {
          case !!parentElement[locationArray[i]]:
            parentElement = parentElement[locationArray[i]];
            break;
          case !!parentElement[locationArray[i] + 's']:
            parentElement = (parentElement[locationArray[i] + 's']).find(el => el.id === locationArray[i + 1]);
            break;

          default:
            parentElement = null;
            break;
        }

        if (parentElement && locationArray[i] !== 'purpose' && locationArray[i] !== 'name') {
          if (location !== '') {
            location += '→';
          }
          const element = typeof(parentElement) === 'string' ?
            parentElement :
            (parentElement.name || parentElement.description || parentElement.display || '');
          location += element !== '' ? `<code>${element}</code>` : '';
        }
      }
      data.location = location;

      // Sets the type variable
      switch (locationArray[0]) {
        case 'form':
          data.typeKey = 'HistoryRevision.comments_types.dataSource';
          break;
        case 'logicalFrame':
          data.typeKey = 'HistoryRevision.comments_types.logicalFrame';
          break;
        case 'indicator':
          data.typeKey = 'HistoryRevision.comments_types.extraIndicator';
          break;
        case 'crossCutting':
          data.typeKey = 'HistoryRevision.comments_types.crossCuttingIndicator';
          break;

        default:
          data.type = '';
          break;
      }

      // Sets column name
      let column;
      let columnCategory: string;
      let month: any; // Only used for month category

      if (data.item) {
        if (data.item.content && !data.item.content[0].comment) {
          column = Object.keys(data.item.content[0].comments)[0];
          columnCategory = data.item.content[0].filter.dimension;
        } else if (data.item.comments) {
          column = Object.keys(data.item.comments)[0];
          columnCategory = data.item.filter.dimension;
        }
      } else if (data.before) {
        if (data.conten && !data.conten.comment) {
          column = Object.keys(data.conten.comments).find(key => data.conten.comments[key] === data.before);
          columnCategory = data.conten.filter.dimension;
        }
      }
      if (column && columnCategory) {
        switch (columnCategory) {
          case 'group':
            data.column = this.project.groups.find(group => group.id === column)?.name || column;
            break;
          case 'entity':
            data.column = this.project.entities.find(ent => ent.id === column)?.name || column;
            break;
          case 'month':
            month = moment(new Date(column));
            if (month.isValid()) { // We save the month appart so it can be translated dynamically in translateElements()
              data.columnMonthKey = month.format('MMM');
              data.columnKey = ' ' + month.format('YYYY');
            } else {
              data.column = column;
            }
            break;
          default:
            data.column = column;
            break;
        }
        if (data.column) {
          data.column = data.column[0].toUpperCase() + data.column.slice(1);
        }
      }
    }

    // Sets the correct translation key
    switch (true) {
      case data.translationKey.includes('add'):
        data.translationKey = 'HistoryRevision.comments_add';
        break;
      case data.translationKey.includes('replace'):
        data.translationKey = 'HistoryRevision.comments_replace';
        break;
      case data.translationKey.includes('remove'):
        data.translationKey = 'HistoryRevision.comments_remove';
        break;

      default:
        data.translationKey = 'HistoryRevision.comments_updated';
        break;
    }

    if (data.column || data.columnKey) { data.translationKey += '_column'; }

    return data;
  }

  private translateElements(elements: any) {
    elements.map(element => {
      if (element.typeKey) {
        element.type = this.translate.instant(element.typeKey);
      }
      if (element.columnKey) {
        element.column = this.translate.instant(element.columnMonthKey) + element.columnKey;
        element.column = element.column[0].toUpperCase() + element.column.slice(1); // Capitalize month
      }
    });
  }

  private translateLocation(revision: any) {
    if (revision) {
      if (this.countryListService.getContinent(revision.continent)) {
        revision.continent = this.countryListService.getContinent(revision.continent)[this.currentLang];
      }
      if (this.countryListService.getCountry(revision.country)) {
        revision.country = this.countryListService.getCountry(revision.country)[this.currentLang];
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
