import { Component, OnInit } from '@angular/core';
import { IndicatorsGroup } from 'src/app/models/indicators-group';

@Component({
  selector: 'app-cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit {
  // data mocked just for test purposes
  indicators: IndicatorsGroup[] = [
    { // IndicatorGroup
      thematic: { // multilingual
        en: 'Multiple thematics',
        es: 'Varias temáticas',
        fr: 'Multi-thématique',
       },
       indicators: [ // Indicator
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
       ]
    },
    { // IndicatorGroup
      thematic: { // multilingual
        en: 'Multiple thematics',
        es: 'Varias temáticas',
        fr: 'Multi-thématique',
       },
       indicators: [ // Indicator
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
           fr: 'On compte le nombre de participations et non pas le nombre de personnes différentes ayant participé à ces forma...'
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
       ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
