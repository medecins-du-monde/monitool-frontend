import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ChartService } from 'src/app/services/chart.service';
import { GroupTitle, SectionTitle } from 'src/app/components/report/reporting-table/reporting-table.component';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { ThemeService } from 'src/app/services/theme.service';
import { Filter } from 'src/app/components/report/filter/filter.component';
import { Theme } from 'src/app/models/classes/theme.model';
import informationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {

  informationIntro = {
    title: 'Rapport général',
    description: 'Cette page vous permet d\'explorer vos données hierarchiquement en partant d\'une vision général de votre projet.'
  } as informationIntro;

  informations = [
    {
      question: 'Comment afficher un graphique ?',
      response: 'À gauche de chaque ligne, le symbole vous permet d\'afficher un graphique contenant les données de la ligne en cours.'
    } as InformationItem,
    {
      question: 'Comment vérifier les données utilisées pour calculer un indicateur ?',
      response: 'Sur chaque indicateur le symbole vous permet d\'accéder aux différentes composantes utilisées pour calculer chaque indicateur: choisissez "Calcul". <br>Cette option n\'est accessible que pour les indicateurs calculés à partir des sources de données.'
    } as InformationItem,
    {
      question: 'Comment désagréger mes données par lieu de collecte?',
      response: 'Sur chaque ligne le symbole vous permet de désagréger votre résultat par lieu de collecte.'
    } as InformationItem,
    {
      question: 'Comment désagréger mes données par tranche d\'age, sexe, pathologie, contenu de formation, ...?',
      response: 'Si vous avez utilisé des désagrégations lors de la collecte de vos données celles-ci apparaitront dans le menu qui est accessible sur chaque ligne en cliquant sur le symbole.<br> Pour les indicateurs calculés (cadres logiques, et indicateurs supplémentaires), il n\'est possible de désagréger les resultats que par lieu de collecte et par unité de temps.'
    } as InformationItem,
    {
      question: 'Que signifie le symbole qui s\'affiche à la place de mes données?',
      response: 'Ce symbole signifie que la saisie des données que vous essayez de consulter n\'a pas encore été réalisée.'
    } as InformationItem,
    {
      question: 'Que signifie le symbole qui s\'affiche à la place de mes données?',
      response: 'Ce symbole signifie qu\'une division par zéro à eu lieu! '
    } as InformationItem,
    {
      question: 'Pourquoi certaines données sont précédées par le symbole ≈?',
      response: 'Vous consultez ces données à un niveau d\'aggrégation qui est inférieur à celui auquel vous les avez collecté! <br>Par exemple, vous avez réalisé la collecte trimestriellement, mais consultez ces données sur un tableau qui les affiche mensuellement. <br> Dans ce cas, les données sont "interpolés" afin de vous permettre d\'avoir des ordres de grandeurs, et de pouvoir comparer des indicateurs que vous ne collectez pas avec les mêmes périodicités entre-eux. <br> Ceci se produit également si vous consultez un indicateur calculé, par exemple un pourcentage, mais que le numérateur et le dénominateur ne sont pas collectés avec les même périodicités. <br>Pour prendre un exemple, si vous avez collecté un nombre de naissances attendues dans une maternité par trimestre, mais que vous le consultez par mois, monitool va distribuer le nombre de naissances trimestrielles dans chaque mois, en corrigeant en fonction du nombre de jours qu\'ils comprennent. <br>Le symbole ≈ est donc affiché en permanence pour vous rappeler que les données que vous consultez sont des approximations grossières de la réalité, et qu\'elles ne peuvent servir qu\'à avoir des ordres de grandeurs.'
    } as InformationItem,
    {
      question: 'Pourquoi certaines données sont affichées en <i>italique</i> ?',
      response: 'Les données affichées en  <i>italique</i> n\'ont été que partiellement saisies. Le plus souvent, cela signifie que seules certains des lieux de collectes attendus ont été saisis. Le cas peut également se produire si vous consultez une version aggrégée (ex: par trimestre) de données collectés à une periodicité plus courte (ex: par mois) et que tous les mois du trimestre considéré n\'ont pas été saisis. <br>En désagrégant la ligne avec le bouton vous pourrez trouver facilement les saisies manquantes.'
    } as InformationItem
  ]
  
  constructor(private projectService: ProjectService,
              private indicatorService: IndicatorService,
              private themeService: ThemeService,
              private chartService: ChartService ) { }

  project: Project;

  filter = new BehaviorSubject<Filter>({
    _start: new Date(),
    _end: new Date(),
  });

  dimensionIds = new BehaviorSubject('');

  tableContent = new BehaviorSubject<any[]>([]);

  options =  {fill: false};

  themes: Theme[];
  crosscutting: Indicator[];
  multiThemesIndicators: Indicator[];
  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  ngOnInit(): void {
    this.projectService.inBigPage.next(true);
    this.chartService.clearChart();
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;

      this.indicatorService.listForProject(this.project.themes.map(x => x.id))
        .then((crosscutting: Indicator[]) => {
          this.crosscutting = crosscutting;
          this.buildIndicators();
        });
    });

    this.themeService.list().then( (themes: Theme[]) => {
      this.themes = themes;
      this.buildIndicators();
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }




  buildIndicators(): void{
    if (!(this.themes && this.crosscutting && this.project)){
      return;
    }
    let rows = [];
    let id = 0;
    let level = 0;

    if (this.project.logicalFrames){
      for (const logicalFrame of this.project.logicalFrames){
        rows.push({
          title: `Logical framework: ${logicalFrame.name}`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);

        rows.push({
          icon: false,
          groupName: `General objective: ${logicalFrame.goal}`,
          sectionId: id,
          level
        } as GroupTitle);

        rows = rows.concat(logicalFrame.indicators);

        level += 1;
        for (const purpose of logicalFrame.purposes){
          rows.push({
            icon: false,
            groupName: `Specific objective: ${purpose.description}`,
            sectionId: id,
            level
          } as GroupTitle);

          rows = rows.concat(purpose.indicators);

          level += 1;
          for (const output of purpose.outputs){
            rows.push({
              icon: false,
              groupName: `Result: ${output.description}`,
              sectionId: id,
              level
            } as GroupTitle);

            rows = rows.concat(output.indicators);

            level += 1;
            for (const activity of output.activities){
              rows.push({
                icon: false,
                groupName: `Activity: ${activity.description}`,
                sectionId: id,
                level
              } as GroupTitle);

              rows = rows.concat(activity.indicators);
            }
            level -= 1;
          }
          level -= 1;
        }
        id += 1;
        level -= 1;
      }
    }

    if (this.project.crossCutting){

      this.buildCrossCuttingIndicators();

      rows.push({
        title: 'Cross-cutting indicators',
        sectionId: id,
        open: false,
        level
      } as SectionTitle);

      if (this.multiThemesIndicators.length > 0){
        rows.push({
          icon: false,
          groupName: 'Multiple thematics',
          sectionId: id,
          level
        } as GroupTitle);

        for (const indicator of this.multiThemesIndicators){
          if (indicator.id in this.project.crossCutting){
            const projectIndicator = new ProjectIndicator(this.project.crossCutting[indicator.id]);
            // TODO: choose right language here
            projectIndicator.display = indicator.name.en;
            rows.push(projectIndicator);
          }
          else{
            rows.push(new ProjectIndicator(indicator));
          }
        }
      }

      if (this.groups.length > 0){
        for (const group of this.groups){
          rows.push({
            icon: false,
            // TODO: choose right language here
            groupName: group.theme.name.en,
            sectionId: id,
            level
          });

          for (const indicator of group.indicators){
            if (indicator.id in this.project.crossCutting){
              const projectIndicator = new ProjectIndicator(this.project.crossCutting[indicator.id]);
              // TODO: choose right language here
              projectIndicator.display = indicator.name.en;
              rows.push(projectIndicator);
            }
            else{
              rows.push(new ProjectIndicator(indicator));
            }
          }
        }
      }

    }

    if (this.project.extraIndicators){
      rows.push({
        title: 'Extra indicators',
        sectionId: id,
        open: false,
        level: 0
      }as SectionTitle);

      rows = rows.concat(this.project.extraIndicators);
      id += 1;
    }

    if (this.project.forms){
      for (const form of this.project.forms){
        rows.push({
          title: `Data source: ${form.name}`,
          sectionId: id,
          open: false,
          level
        } as SectionTitle);

        for (const element of form.elements){
          const computation =  {
            formula: 'a',
            parameters: {
              a: {
                elementId: element.id,
                filter: {}
              }
            }
          };
          rows.push(new ProjectIndicator({
            display: element.name,
            baseline: 0,
            target: 0,
            colorize: false,
            computation
          }));
        }

        id += 1;
      }
    }
    this.tableContent.next(rows);
  }

  buildCrossCuttingIndicators(): void {
    this.multiThemesIndicators = [];
    for (const c of this.crosscutting){
      if (c.multiThemes){
        this.multiThemesIndicators.push(c);
      }
      else{
        const group = this.groups.find(g => g.theme === c.themes[0]);
        if (group){
          group.indicators.push(c);
        }
        else{
          this.groups.push({
            theme: c.themes[0],
            indicators: [c]
          });
        }
      }
    }
  }

  get chartData(){
    return this.chartService.data.value;
  }

  receiveFilter(value): void{
    this.filter.next(value);
  }

  receiveDimension(value): void{
    this.dimensionIds.next(value);
  }

}


