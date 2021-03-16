import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  informationIntro = {
    title: 'Liste des utilisateurs',
    description: 'Plusieurs types d\'utilisateurs interviennent dans la mise en place et dans le suivi d\'un projet: coordination, staff M&E, opérateurs de saisie, partenaires, ... <br>Listez ici tous les utilisateurs qui doivent avoir accès au monitoring de ce projet.'
  } as InformationIntro

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
    } as InformationItem
  ]

  private subscription: Subscription = new Subscription();

  users: User[];
  project: Project;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.users = [];

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.users = this.project.users;
      })
    );
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  onDelete(id: string) {
    const oldUserIndex = this.project.users.findIndex(u => u.id === id);
    this.project.users.splice(oldUserIndex, 1);
    this.projectService.project.next(this.project);
  }

  onEdit(user: User) {
    let oldUserIndex = null;
    if (user.type === 'internal'){
      oldUserIndex = this.project.users.findIndex(u => u.id === user.id);
    }
    else {
      oldUserIndex = this.project.users.findIndex(u => u.username === user.username);
    }
    this.project.users[oldUserIndex] = user;
    this.projectService.project.next(this.project);
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data){
        this.project.users.push(res.data);
        this.projectService.project.next(this.project);
      }
    });
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>) {
    this.users[event.previousContainer.data.index] = event.container.data.user;
    this.users[event.container.data.index] = event.previousContainer.data.user;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
