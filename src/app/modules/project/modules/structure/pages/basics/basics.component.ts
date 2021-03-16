import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { ProjectService } from 'src/app/services/project.service';
import { ThemeService } from 'src/app/services/theme.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateService } from 'src/app/services/date.service';

import DatesHelper from 'src/app/utils/dates-helper';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss'],
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
export class BasicsComponent implements OnInit, OnDestroy {

  basicsForm: FormGroup;

  themes: Theme[] = [];

  informationIntro = {
    title: 'Données de base',
    description: 'Les données de bases permettent de classer votre projet parmi les autres de l\'ONG.'
  } as InformationIntro;

  informations = [
    {
      question: 'Un projet dans Monitool, c\est quoi ?',
      response: ' Sur Monitool, on ne parle pas de base de données, de requêtes, de dimensions, de jointures... <br>Un projet, est un projet au sens entendu dans une organisation humanitaire, le même que celui pour lequel vous rédigez un proposal à votre bailleur de fonds.'
    } as InformationItem,
    {
      question: 'Comment choisir des noms adaptés pour les lieux de collecte, sources de données, variables et indicateurs ?',
      response: 'Utilisez des noms courts pour nommer les différents composants de votre projet. <br>En évitant les acronymes vous améliorez la lisibilité de vos graphiques et tableaux et permettez une meilleur compréhension de votre projet par tous les acteurs concernés.'
    } as InformationItem,
    {
      question: 'Je viens de supprimer quelque chose de mon projet par erreur, mais je n\'ai pas encore sauvegardé. Comment revenir en arrière?',
      response: ' En cas d\'erreur, cliquez sur <button>Annuler les modifications</button> pour revenir à la dernière version sauvegardée de votre projet'
    } as InformationItem,
    {
      question: 'J\'ai supprimé quelque chose de mon projet par erreur, et j\'ai sauvegardé ma modification. Comment revenir en arrière?',
      response: 'Rendez-vous sur la page la structure de votre projet. <br>Vous pouvez consulter toutes les modifications qui ont été réalisées depuis la création du projet, et revenir au moment que vous désirez'
    } as InformationItem,
    {
      question: 'Je ne connais pas la date de fin de mon projet',
      response: 'Vous pourrez la modifier à tout instant, laissez la valeur par défaut (dans un an).'
    } as InformationItem
  ]

  private subscription: Subscription = new Subscription();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedThemes() {
    return this.basicsForm ? this.themes.filter(x => this.basicsForm.controls.themes.value.includes(x.id)) : [];
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    // TODO: Check if the subscription.add is usefull, if yes, we may have to set it everywhere
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.basicsForm = this.fb.group({
          country: [project.country, Validators.required],
          name: [project.name, Validators.required],
          themes: [project.themes.map(x => x.id)],
          start: [project.start, Validators.required],
          end: [project.end, Validators.required],
          visibility: [project.visibility, Validators.required]
        }, { validators: [DatesHelper.orderedDates('start', 'end')] });
        this.basicsForm.valueChanges.subscribe((value: any) => {
          const selectedThemes = value.themes;
          value.themes = this.themes.filter(x => selectedThemes.includes(x.id));
          this.projectService.valid = this.basicsForm.valid;
          this.projectService.project.next(Object.assign(project, value));
        });
      })
    );

    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
    });

    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.basicsForm.controls.themes.value;
    this.basicsForm.controls.themes.setValue(themes.filter(t => t !== theme.id));
  }
}
