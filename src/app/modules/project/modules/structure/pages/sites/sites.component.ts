import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { DateService} from 'src/app/services/date.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';




@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    }
  ]
})
export class SitesComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.Collection_sites',
      res2: 'InformationPanel.Collection_sites_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem
  ];

  project: Project;

  displayInfos = true;

  sitesForm: FormGroup = new FormGroup({
    entities: new FormArray([]),
    groups: new FormArray([])
  });

  entitiesDisplayedColumns: string[] = ['position', 'name', 'start', 'end', 'delete'];

  entitiesDataSource = new MatTableDataSource<AbstractControl>();

  get entities(): FormArray {
    return this.sitesForm.get('entities') as FormArray;
  }

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  groupsDataSource = new MatTableDataSource<AbstractControl>();

  get groups(): FormArray {
    return this.sitesForm.get('groups') as FormArray;
  }

  get selectedEntities(): FormArray {
    return this.groups.value.map(x => {
      return this.entities.value.filter(e => x.members.includes(e.id));
    });
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.country,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'CollectionSites',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (!this.project || project.id !== this.project.id || project.rev !== this.project.rev || !project.parsed) {
          this.project = project;
          project.parsed = true;
          this.sitesForm = this.fb.group({
            entities: this.fb.array(this.project.entities.map(x => FormGroupBuilder.newEntity(project, x))),
            groups: this.fb.array(this.project.groups.map(x => FormGroupBuilder.newEntityGroup(x)))
          });
          this.entitiesDataSource.data = this.entities.controls;
          this.groupsDataSource.data = this.groups.controls;
          this.sitesForm.valueChanges.subscribe((value: any) => {
            value.entities = value.entities.map(x => new Entity(x));
            const groups = [];
            value.groups.forEach(x => {
              const group = new Group(x);
              const members = x.members;
              group.members = value.entities.filter(e => members.includes(e.id));
              groups.push(group);
            });
            value.groups = groups;
            this.projectService.valid = this.datesAreInRange() && this.sitesForm.valid;
            this.projectService.project.next(Object.assign(project, value));
          });
        }
      })
    );

    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );
    this.projectService.updateInformationPanel(this.informations);

  }

  public onAddNewEntity(): void {
    this.entities.push(FormGroupBuilder.newEntity(this.project));
    this.entitiesDataSource.data = this.entities.controls;
    this.projectService.valid = this.datesAreInRange() && this.sitesForm.valid;
  }

  public onRemoveEntity(index: number): void {
    const entityId = this.entities.controls[index].value.id;

    // Remove the deleted entity from forms
    this.project.forms.map(form => {
      form.entities = form.entities.filter(entity => entity.id !== entityId);
    });

    // Remove the deleted entity from logicalFrames
    this.project.logicalFrames.map(logicalFrame => {
      logicalFrame.entities = logicalFrame.entities.filter(entity => entity.id !== entityId);
    });

    this.entities.removeAt(index);
    this.entitiesDataSource.data = this.entities.controls;
    this.projectService.valid = this.datesAreInRange() && this.sitesForm.valid;
  }

  onEntityRemoved(index: number, id: number): void {
    const group = this.groups.controls[index] as FormGroup;
    const members = group.controls.members;
    members.setValue(members.value.filter(x => x !== id));
  }

  public onAddNewGroup(): void {
    this.groups.push(FormGroupBuilder.newEntityGroup());
    this.groupsDataSource.data = this.groups.controls;
  }

  public onRemoveGroup(index: number): void {
    this.groups.removeAt(index);
    this.groupsDataSource.data = this.groups.controls;
  }

  onListDrop(event: CdkDragDrop<string[]>, type: 'groups' | 'entities') {
    // Swap the elements around
    if (type !== 'entities' && type !== 'groups') {
      return;
    }
    const selectedFormArray = this.sitesForm.get(type) as FormArray;
    const selectedControl = selectedFormArray.at(event.previousIndex);
    selectedFormArray.removeAt(event.previousIndex);
    selectedFormArray.insert(event.currentIndex, selectedControl);

    if (type === 'entities') {
      this.entitiesDataSource.data = this.entities.controls;
    } else {
      this.groupsDataSource.data = this.groups.controls;
    }
  }

  toggleStartInfos(): void {
    this.displayInfos = !this.displayInfos;
  }

  private datesAreInRange(): boolean {
    for (const element of this.entities.value) {
      const start = (element.start as any)._d || element.start ;
      const end = (element.end as any)._d || element.end ;
      if (start.getTime() < this.project.start.getTime() ||
          end.getTime() > this.project.end.getTime()) {
        this.projectService.errorMessage = {
          message: 'DatesOutOfRange',
          type: 'CollectionSite'
        };
        return false;
      } else {
        const subscription = this.projectService.lastSavedVersion.subscribe(res => {
          console.log(res, element);
          const oldCollectionSite = res.entities.find(collectionSite => collectionSite.id === element.id);
          if (start.getTime() > oldCollectionSite.start.getTime()) {
            this.projectService.warningMessage = {
              message: 'DataDeletionStart',
              type: 'CollectionSite'
            };
          } else if (end.getTime() < oldCollectionSite.end.getTime()) {
            this.projectService.warningMessage = {
              message: 'DataDeletionEnd',
              type: 'CollectionSite'
            };
          } else {
            this.projectService.warningMessage = undefined;
          }
        });
        subscription.unsubscribe();
      }
    }
    this.projectService.errorMessage = undefined;
    return true;
  }
}
