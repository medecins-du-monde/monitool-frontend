import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-logical-frames-list',
  templateUrl: './logical-frames-list.component.html',
  styleUrls: ['./logical-frames-list.component.scss']
})
export class LogicalFramesListComponent implements OnInit {

  project: Project;
  logicalFrames: LogicalFrame[] = [];

  informationIntro = {
    title: 'Liste des cadres logiques',
    description: 'Un cadre logique est un document qui décrit les objectifs, les résultats attendus, et les activités misent en oeuvre pour y parvenir, ainsi que les indicateurs qui permette de suivre l\'avancement de chaque élément. Tous les indicateurs présents dans les cadres logiques doivent être calculables à partir des données décrites dans les sources de données.'
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
  ]

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.logicalFrames = project.logicalFrames;
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  onCreate(): void {
    const newLogicalFrame = new LogicalFrame();
    this.project.logicalFrames.push(newLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${newLogicalFrame.id}`]);
  }

  onClone(logicalFrame: LogicalFrame): void {
    const clonedLogicalFrame = new LogicalFrame(logicalFrame.serialize());
    this.project.logicalFrames.push(clonedLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${clonedLogicalFrame.id}`]);
  }

  onEdit(logicalFrame: LogicalFrame): void {
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${logicalFrame.id}`]);
  }

  onDelete(logicalFrame: LogicalFrame): void {
    this.project.logicalFrames = this.project.logicalFrames.filter(x => x.id !== logicalFrame.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.logicalFrames[event.previousContainer.data.index] = event.container.data.logicalFrame;
    this.logicalFrames[event.container.data.index] = event.previousContainer.data.logicalFrame;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
