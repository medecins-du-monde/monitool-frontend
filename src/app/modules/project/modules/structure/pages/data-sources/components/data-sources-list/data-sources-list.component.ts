import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources-list',
  templateUrl: './data-sources-list.component.html',
  styleUrls: ['./data-sources-list.component.scss']
})
export class DataSourcesListComponent implements OnInit {

  informationIntro = {
    title: 'Liste des sources de données',
    description: 'Les sources de données sont les différents supports desquels les données nécessaires au monitoring du projet sont extraites (fiches de suivi, dossiers patient, fichiers Excel, ...) <br>Au sein de monitool, on ne décrira pas l\'intégralité des données existantes, mais uniquement la partie qui va être extraite pour le suivi du projet. <br>Afin de faciliter l\'organisation de la saisie, les sources doivent correspondre à des outils réels utilisés sur le terrain. '
  } as InformationIntro;

  informations = [
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
      question: 'Comment est estimée la durée de saisie ?',
      response: 'Cette indication est là pour donner un ordre de grandeur. <br>La formule utilisée considère qu\'il faut 10 secondes par case remplie.'
    } as InformationItem,
    {
      question: 'Que se passe-t\'il quand je déplace des variables entre des sources de données qui n\'ont pas les même périodicités ou lieux de collecte? ',
      response: ' Les données déjà saisies vont êtres déplacées et aggrégées ou interpolées pour s\'adapter à la nouvelle périodicité. <br>Si les lieux de collectes ne sont pas les mêmes entre les deux sources de données. <br><ul><li>Les données qui ont été saisies sur les lieux supplémentaires deviendront inaccessibles.</li><li>Les saisisseurs seront invités à saisir retro-activement les données manquante.</li></ul>'
    } as InformationItem
  ]

  project: Project;
  forms: Form[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  onCreate(): void {
    const newForm = new Form();
    this.project.forms.push(newForm);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${newForm.id}`]);
  }

  onEdit(form: Form): void {
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${form.id}`]);
  }

  onDelete(form: Form): void {
    this.project.forms = this.project.forms.filter(x => x.id !== form.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.forms[event.previousContainer.data.index] = event.container.data.form;
    this.forms[event.container.data.index] = event.previousContainer.data.form;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
