import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Form } from 'src/app/models/classes/form.model';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';
import { DateService } from 'src/app/services/date.service';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';

@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss'],
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
export class DataSourceEditComponent implements ComponentCanDeactivate, OnInit, OnDestroy {

  informationIntro = {
    title: 'Édition d\'une source de données',
    description: ''
  } as InformationIntro;

  informations = [
    {
      question: 'Comment choisir des noms adaptés pour les lieux de collecte, sources de données, variables et indicateurs ?',
      response: 'Utilisez des noms courts pour nommer les différents composants de votre projet. <br>En évitant les acronymes vous améliorez la lisibilité de vos graphiques et tableaux et permettez une meilleur compréhension de votre projet par tous les acteurs concernés.'
    } as InformationItem,
    {
      question: 'Je viens de supprimer quelque chose de mon projet par erreur, mais je n\'ai pas encore sauvegardé. Comment revenir en arrière?',
      response: 'En cas d\'erreur, cliquez sur <button>Annulez les modifications</button> pour revenir à la dernière version sauvegardée de votre projet'
    } as InformationItem,
    {
      question: 'J\'ai supprimé quelque chose de mon projet par erreur, et j\'ai sauvegardé ma modification. Comment revenir en arrière ?',
      response: 'Rendez-vous sur la page <button>Historique</button> la structure de votre projet. <br> Vous pouvez consulter toutes les modifications qui ont été réalisées depuis la création du projet, et revenir au moment que vous désirez'
    } as InformationItem,
    {
      question: 'Mes équipes passent trop de temps à saisir des données, comment réduire?',
      response: 'Réduisez la quantitée de données à collecter! <br>Par exemple, vous pouvez désactiver des variables ou des désagrégations que vous n\'analysez pas, ou bien réduire la périodicité de la saisie.'
    } as InformationItem,
    {
      question: 'Je ne comprend pas les deux questions sur "Comment grouper les saisies"',
      response: `Monitool vous affiche des rapports selon l\'échelle de temps de votre choix (semaine, mois, trimestre...) et ne vous demande pas de saisir vos données autant de fois qu\'il y a d\'échelles de temps. 
                <br>Pour cela, il est nécessaire de savoir comment aggréger les données qui sont saisies dans l\'outil, et ces règles dependent de la nature des données que vous saisissez.<br><br>
                <table class="information-panel-table">
                  <tr>
                    <th class="information-panel-cell">Variable</th>
                    <th class="information-panel-cell">Comment grouper dans le temps</th>
                    <th class="information-panel-cell">Comment grouper entre site</th>
                  </tr>
                  <tr>
                    <td class="information-panel-cell">Nombre de consultations médicales</td>
                    <td class="information-panel-cell">Si 10 consultations sont réalisés par jour, cela fait 70 consulations par semaine, donc "Somme"</td>
                    <td class="information-panel-cell">10 consultations à Paris et 10 consultations à Lilles font 20 consultations, donc "Somme" également</td>
                  </tr>
                  <tr>
                    <td class="information-panel-cell">Nombre de structures soutenues</td>
                    <td class="information-panel-cell">10 structures étaient soutenues en janvier, et 15 en février et 20 en mars, la valeur à garder pour le trimestre est 15, donc "Moyenne"</td>
                    <td class="information-panel-cell">10 structures étaient soutenues à Paris, et 10 à Lilles, cela fait 20 structures, donc "Somme"</td>
                  </tr>
                </table>`
    } as InformationItem,
    {
      question: 'Je veux changer la périodicité de collecte de ma source de données alors que j\'ai déjà réalisé des saisies',
      response: 'Pas de soucis! <br>Vos rapports ne changeront pas: vous pourrez toujours consulter toutes vos données sans aucune perte de précision. <br><br>Cependant, attention! Si vous changez pour une periodicité plus longue (par exemple, hebdomadaire vers mensuelle), vous devrez faire attention à corriger les données de la dernière saisie qui sera sûrement incomplète et pourtant marquée comme "faite"! '
    } as InformationItem,
    {
      question: 'Je veux ajouter une variable mais j\'ai déjà réalisé des saisies.',
      response : ' Vous pouvez ajouter des variables à tout moment sans perte de données. <br>Vous aurez alors le choix de retourner saisir les données correspondantes rétroactivement, ou bien de laisser les saisies en l\'état, qui seront alors marquées comme "incomplètes" dans le tableau de bord du projet, sans autres conséquences. '
    } as InformationItem,
    {
      question: 'Je veux arrêter de saisir une variable mais j\'ai déjà réalisé des saisies.',
      response: 'Vous pouvez désactiver des variables à tout moment sans perte de données. <br>Les données rentrées précedement seront toujours accessibles dans vos rapports, mais toutes les nouvelles saisies seront alors marquées comme "incomplètes" dans le tableau de bord du projet, sans autres conséquences. <br>Lorsque vous n\'aurez plus usage de cette variable, vous pourrez alors la supprimer. '
    } as InformationItem,
    {
      question: 'Je veux supprimer une variable mais j\'ai déjà réalisé des saisies.',
      response: 'Elle disparaitra alors des formulaires de saisie, et rétroactivement de tous vos rapports. <br> <br>Tous les indicateurs qui en dépendent seront marqués comme "Impossible à calculer" jusqu\'à que vous corrigiez leur formule. <br>Vos données ne seront pas perdues, mais la seule manière de les récupérer consistera à vous rendre sur la page "Historique" pour annuler la modification.'
    } as InformationItem,
    {
      question: 'Je veux ajouter une désagrégation mais j\'ai déjà réalisé des saisies',
      response: 'Par exemple rajouter une désagrégation par sexe du patient sur un nombre de consultations médicales, alors que je ne les différenciait que par pathologie. <br><br>Vous pouvez rajouter des désagrégations à tout moment sans perte de données. <br>Lorsque vous consulterez vos rapports, les données des anciennes saisies qui ne contenaient pas cette désagrégation par sexe vont continuer à s\'afficher et ne changeront pas. <br><br>Pour vous permettre de comparer les anciennes données et les nouvelles, si vous choisissez de désagréger vos rapports par sexe, monitool va distribuer les anciennes données en faisant comme hypothèse qu\'il y avait autant de femmes que d\'hommes avant le changement. Afin de ne pas vous induire en erreur, ces données "interpolées" sont clairement indiquées dans les rapports car elles seront toutes précédées par le symbole ≈.'
    } as InformationItem,
    {
      question: 'Je veux supprimer une désagrégation mais j\'ai déjà réalisé des saisies.',
      response: 'Toutes les données qui ont étés saisies jusqu\'à ce jour vont être aggrégées, et la désagrégation va disparaitre rétroactivement des rapports. <br>Vous ne pourrez plus voir cette désagrégation dans les rapports, même sur les données saisies avant la modification. <br>Une alternative consiste à désactiver cette désagrégation.'
    } as InformationItem
  ]

  dataSourceForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    entities: new FormControl(null),
    periodicity: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
    elements: new FormArray([], [this.minLengthArray(1)])
  });

  startDate: Date;
  endDate: Date;

  public entities: Entity[];
  public form: Form;
  public project: Project;
  public periodicities = [];

  get selectedEntities(): any[] {
    return this.dataSourceForm.controls.entities.value;
  }

  get elements(): FormArray {
    return this.dataSourceForm.controls.elements as FormArray;
  }

  private formSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    combineLatest([this.projectService.openedProject, this.route.paramMap]).pipe(
      map(results => ({ project: results[0], formId: (results[1] as ParamMap).get('id') }))
    ).subscribe((res: { project: Project, formId: string }) => {
      this.project = res.project;
      this.entities = res.project.entities;
      const oldForm = this.form;
      this.form = res.project.forms.find(x => x.id === res.formId);
      if (!this.form) {
        this.router.navigate(['..'], { relativeTo: this.route });
      } else if (JSON.stringify(oldForm) !== JSON.stringify(this.form)) {
        this.setForm();
      }
    });

    for (const value of Object.values(TimeSlotPeriodicity)) {
      this.periodicities.push({
        value,
        display: `Enum.Periodicity.${value}`
      });
    }

    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private setForm(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.dataSourceForm = this.fb.group({
      id: [this.form.id],
      name: [this.form.name, Validators.required],
      entities: [this.entities.filter(x => this.form.entities.map(e => e.id).includes(x.id))],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start, Validators.required],
      end: [this.form.end, Validators.required],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)), [this.minLengthArray(1)])
    }, { validators: [DatesHelper.orderedDates('start', 'end')] });

    this.formSubscription = this.dataSourceForm.valueChanges.subscribe((value: any) => {
      this.projectService.valid = this.dataSourceForm.valid;
      this.form.deserialize(value);
      this.projectService.project.next(this.project);
    });
  }

  private minLengthArray(min: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } => {
      if (c.value.length >= min) {
        return null;
      }
      return { minLengthArray: true };
    };
  }

  toggleCustomDate(event: any, selected: string): void {
    if (event.value === 'false') {
      this.dataSourceForm.get(selected).setValue(this.project[selected]);
    }
    else {
      this.dataSourceForm.get(selected).setValue(null);
    }
  }

  isCustom(selected: string): boolean {
    return this.project && this.dataSourceForm
      && !DatesHelper.areEquals(new Date(this.dataSourceForm.get(selected).value), new Date(this.project[selected]));
  }

  onEntityRemoved(entity: Entity): void {
    const entities = this.dataSourceForm.controls.entities.value;
    this.dataSourceForm.controls.entities.setValue(entities.filter(x => x.id !== entity.id));
  }

  onAddNewElement(): void {
    this.elements.push(this.newElement());
  }

  onRemoveElement(i: number): void {
    this.elements.removeAt(i);
  }

  private newElement(element?: FormElement): FormGroup {
    if (!element) {
      element = new FormElement();
    }
    return this.fb.group({
      id: [element.id],
      name: [element.name, Validators.required],
      partitions: this.fb.array(element.partitions.map(x => this.newPartition(x))),
      distribution: [element.distribution],
      geoAgg: [element.geoAgg],
      timeAgg: [element.timeAgg]
    });
  }

  private newPartition(partition: Partition): FormGroup {
    const partitionForm = this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation],
      elements: this.fb.array(partition.elements.map(x => this.newPartitionElement(x))),
      useGroups: [partition.useGroups]
    });
    const elements = partitionForm.controls.elements as FormArray;
    partitionForm.addControl('groups', this.fb.array(
      partition.useGroups ? partition.groups.map(x => this.newPartitionGroup(x, elements)) : []));
    return partitionForm;
  }

  private newPartitionElement(partitionElement: PartitionElement): FormGroup {
    return this.fb.group({
      id: [partitionElement.id],
      name: [partitionElement.name, Validators.required]
    });
  }

  private newPartitionGroup(partitionGroup: PartitionGroup, elements: FormArray): FormGroup {
    return this.fb.group({
      id: [partitionGroup.id],
      name: [partitionGroup.name, Validators.required],
      members: [elements.value.filter(x => partitionGroup.members.map(m => m.id).includes(x.id))]
    });
  }

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>): void {
    const selectedControl = this.elements.at(event.previousIndex);
    const newControls = this.elements.at(event.currentIndex);
    this.elements.setControl(event.previousIndex, newControls);
    this.elements.setControl(event.currentIndex, selectedControl);
  }
}
