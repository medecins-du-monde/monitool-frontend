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
      content: '<b>Structurer</b> le système de monitoring des projects'
    },
    {
      icon: 'quality',
      content: '<div><b>Augmenter la fiabilité</b></div>' +
      '<ul><li>Disposer de contrôles de cohérence afin de limiter les erreurs de saisie</li>' +
      '<li>Limiter les fautes de calcul</li></ul>'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
