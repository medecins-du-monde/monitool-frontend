import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  onlinePlatformCards = [
    {
      icon: 'organigram',
      content: '<p><b>Structurer</b> le système de monitoring des projects</p>'
    },
    {
      icon: 'quality',
      content: '<p><b>Augmenter la fiabilité</b></p>' +
      '<ul><li>Disposer de contrôles de cohérence afin de limiter les erreurs de saisie</li>' +
      '<li>Limiter les fautes de calcul</li></ul>'
    },
    {
      icon: 'pie-chart',
      content: '<p><b>Prendre du recul</b></p>' +
      '<ul><li>Encourager des projets géographiquement éloignés à utiliser les mêmes indicateurs lorsqu’ils mesurent des grandeurs comparables</li>' +
      '<li>Disposer de mécanismes pour comparer la valeur d’un indicateur sur un projet, avec la même grandeur chez tous les autres qui le collectent</li></ul>'
    },
    {
      icon: 'message',
      content: '<p><b>Faciliter la communication</b></p>' +
      '<ul><li>Disposer de mécanismes pour comparer la valeur d’un indicateur sur un projet, avec la même grandeur chez tous les autres qui le collectent</li>' +
      '<li>Disposer d\'une unique version des données partagée entre siège et terrain</li></ul>'
    },
    {
      icon: 'parameters',
      content: '<p><b>Standardiser</b></p>' +
      '<ul><li>Faciliter le turn-over en limitant l\'utilisation d\'outils différents sur chaque projet.</li>' +
      '<li>Réduire la courbe d’apprentissage nécessaire à l\'exploitation des données d\'un nouveau projet.</li></ul>'
    },
  ];

  keepInMindCards = [
    {
      content: '<p>Monitool est un outil de monitoring.</p>' +
      '<p>Il participe au suivi permanent, continue et systématique de la situation et de son évolution tout le long de la vie d’un projet.</p>' +
      '<p>L\'objectif de cet outil est d\'aider à la prise de décision, grâce au suivi régulier d\'indicateurs qui vous renseigneront sur l\'avancement de vos activités, et sur la contribution de ces dernières aux résultats et objectifs fixés par votre projet.</p>' +
      '<p>Bien qu\'il puisse y contribuer, son objectif premier n\'est pas de réaliser du suivi épidémiologique, ou de centraliser des fiches de morbidité qui sont chronophages et n\'ont que peu de valeur en gestion de projet, spécialement sur des projets de soutien à des structures sanitaires.</p>'
    }
  ];

  firstStepsCards = [
    {
      icon: 'grid',
      content: '<p>Concevoir votre projet de référence: cadre logique de référénce avec des indicateurs de résultat, d’effet et si nécessaire de processus.</p>'
    },
    {
      icon: 'clipboard',
      content: '<p>Concevoir votre projet de référence: cadre logique de référénce avec des indicateurs de résultat, d’effet et si nécessaire de processus.</p>' +
      '<ul><li>Pourquoi: Commencez par identifier en quoi votre indicateur va permettre de mesurer l\'atteinte du résultat auquel il est associé ou l’effet attendu, et comment vous l\'analyserez (graphiques, tableaux, avec quelle fréquence. Il est indispensable de planifier l’utilisation des données pour la prise de décisison).</li>' +
      '<li>Pourquoi: Commencez par identifier en quoi votre indicateur va permettre de mesurer l\'atteinte du résultat auquel il est associé ou l\'effet attendu, et comment vous l\'analyserez (graphiques, tableaux, avec quelle fréquence. Il est indispensable de planifier l’utilisation des données pour la prise de décisison).</li>' +
      '<li>Quand, oú, par et pour qui.</li></ul>'
    },
    {
      icon: 'format-shapes',
      content: '<p>Construire un dataflow chart à partir du résumé des indicateurs afin de schématiser le flux des données dans votre projet</p>' +
      '<ul><li>Les sources de sources de données organisées suivant le plan du projet</li>' +
      '<li>Les données et leur désagrégations précises</li>' +
      '<li>Les indicateurs organisés par cadre logique</li></ul>'
    },
  ];

  guidesCards = [
    {
      content: '<ul><li><p><b>Guide de planification de projets de santé (2015)</b></p>' +
      '<p>Le guide Planification de projets de santé  propose aux acteurs des projets de MdM une méthode de planification en accord avec les valeurs réaffirmées et précisées dans le projet associatif (soigner, témoigner et plaider, et accompagner les communautés dans leur volonté de changement social).</p></li>' +
      '<li><p><b>Boite à outils de Planification de projets de santé</b></p>' +
      '<p>La boite à outils  vous propose differents outils, majoritairement sur Excel, afin de vous aider à structurer votre planification.</p></li>' +
      '<li><p><b>Bibliothèque monitoring de la DSP</b></p>' +
      '<p>Cette bibliothèque  vous propose divers fiches techniques, documents de formations et de positionnements liés au monitoring, et est maintenu par la DSP.</p></li>' +
      '</ul>'
    }
  ];

  othersToolsCards = [
    {
      content: '<ul><li><p><b>Résumé des indicateurs</b></p>' +
      '<p>Disponible dans l\'archive des <a href="https://www.w3schools.com/tags/tag_a.asp">Documents essentiels au monitoring</a> , cet outil rassemble pour tous vos indicateurs le "quand", "comment", "oú", "par qui", "pourquoi" et "pour qui" les données que vous traitez doivent être collectées et analysées.</p></li>' +
      '<li><p><b>Dataflow chart</b></p>' +
      '<p>Dans la même archive cet outil schématise le chemin que vos données suivent dans le temps, du formulaire qui a servi à leur collecte dans une structure de santé, au rapport et à la prise de décision.</p></li>' +
      '</ul>'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
