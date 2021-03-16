import { Project } from '../../../../../../models/classes/project.model';
import { IndicatorModalComponent } from './../logical-frames/components/indicator-modal/indicator-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { ProjectService } from 'src/app/services/project.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {

  informationIntro = {
    title: 'Indicateurs annexés',
    description: 'Les indicateurs annexés sont des indicateurs complémentaires qui ne figurent dans aucun cadre logique. <br>Ils permettent de suivre des éléments spécifiques du projet (données médicales, logistiques, ...) '
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
  ];


  extraIndicatorsForm: FormGroup;

  extraIndicators: ProjectIndicator[] = [];
  project: Project;

  constructor(private projectService: ProjectService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.setForm();
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  get indicators(): FormArray {
    return this.extraIndicatorsForm.controls.indicators as FormArray;
  }

  private setForm() {
    this.extraIndicatorsForm = this.fb.group({
      indicators: this.fb.array(this.project.extraIndicators.map(x => FormGroupBuilder.newIndicator(x)))
      });
  }
  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }
  onEditIndicator(indicator: FormGroup, index?: number): void {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number): void {
    this.indicators.removeAt(i);
    this.project.extraIndicators.splice(i, 1);
    this.projectService.valid = this.extraIndicatorsForm.valid;
    this.projectService.project.next(this.project);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number): void {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.project.extraIndicators.push(new ProjectIndicator(res.indicator.value));
          this.indicators.push(res.indicator);
          this.projectService.valid = this.extraIndicatorsForm.valid;
          this.projectService.project.next(this.project);
        }
        else if (index !== null) {
          this.project.extraIndicators[index] = new ProjectIndicator(res.indicator.value);
          this.indicators.setControl(index, res.indicator);
          this.projectService.valid = this.extraIndicatorsForm.valid;
          this.projectService.project.next(this.project);
        }
      }
    });
  }

  // drag and drop function on a form array that can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.indicators.setControl(event.previousContainer.data.index, event.container.data.indicator);
    this.indicators.setControl(event.container.data.index, event.previousContainer.data.indicator);
    this.project.extraIndicators = this.indicators.value.map(x => new ProjectIndicator(x));
    this.projectService.project.next(this.project);
  }

}
