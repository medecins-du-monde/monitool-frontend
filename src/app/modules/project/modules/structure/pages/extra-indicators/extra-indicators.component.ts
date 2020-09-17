import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {

  indicators = [ // Indicator
    {
      name: {
        en: 'Training volume',
        es: 'Volumen de formación',
        fr: 'Volume de formation'
      },
      themes: [], // string[]
    },
    {
      name: {
        en: 'Training volume',
        es: 'Volumen de formación',
        fr: 'Volume de formation'
      },
      themes: [], // string[]
    },
    {
      name: {
        en: 'Training volume',
        es: 'Volumen de formación',
        fr: 'Volume de formation'
      },
      description: {
        en: 'We are not talking about health education, but training of medical staff. Count the number of entries and not the number of different people who attended these trainings.',
        es: 'No se trata de educación para la salud, sino de formación para el personal sanitario. Se cuenta el número de participaciones y no el número de personas distintas que hayan participado.',
        fr: 'On ne parle pas d\'éducation pour la santé, mais de formation à du personnel soignant. On compte le nombre de participations et non pas le nombre de personnes différentes ayant participé à ces forma...'
      },
      themes: [], // string[]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
