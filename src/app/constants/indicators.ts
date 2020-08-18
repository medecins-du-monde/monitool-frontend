import { IndicatorsGroup } from '../models/indicators-group';
export let indicatorsList: IndicatorsGroup[] = [
    {
        thematic: 'CrCo: Crises et conflits',
        indicators: [{
            indicatorName: 'Projet en zone de conflit (0 / 1)',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        }]
    },
    {
        thematic: 'MGR: Migrants',
        indicators: [{
            indicatorName: 'Nombre de consultations médicales faites auprès de migrants',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        }]
    },
    {
        thematic: 'RdR: Réduction des risques',
        indicators: [{
            indicatorName: 'File active ARV annuelle',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Nombre moyen de seringues distribuées par UDVI par an',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        },
        {
            indicatorName: 'Taux de rétention OST',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        }]
    },
    {
        thematic: 'SSR: Santé sexuelle et reproductive',
        indicators: [{
            indicatorName: 'Acteurs communautaires sensibilisés au référencement',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Formation au cadre de référence',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Nb da`ccouchements assistés',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Nb de consultation de post partum',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Nb de consultations de PF',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Nb de CPN',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Personnel formé concernant les VLG',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Personnel formé à la prise en charge pré et post avortement',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Ratio de mortalité maternelle institutionnelle',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Satisfaction des bénéficiaires',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Structures de santé disposant de SOUB/SOUC',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Taux d`accouchements assistés par un personnel qualifié',
            description: 'La description de cet indicateur n\'a pas été renseignée',
        },
        {
            indicatorName: 'Taux de CPN 1',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        },
        {
            indicatorName: 'Taux de mortalité néonatale institutionnelle',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        },
        {
            indicatorName: 'Taux de prévalence contraceptive',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        },
        {
            indicatorName: 'Taux de prévalence contraceptive (institutionnelle)',
            description: 'La description de cet indicateur n\'a pas été renseignée',

        }]
    },
    {
        thematic: 'Multi-thématique',
        indicators: [{
            indicatorName: 'File active annuelle',
            description: 'Nombre de bénéficiaires différents ayant fréquenté les établissements du projet au moins une fois dans l\'année',
            thematics: 'CrCo ENV MGR RdR SSR',
        },
        {
            indicatorName: 'Volume de formation',
            description: ' On ne parle pas d\'éducation pour la santé, mais de formation à du personnel soignant. On compte le nombre de ' +
                'participations et non pas le nombre de personnes différentes ayant participé à ces forma...',
            thematics: 'CrCo ENV MGR RdR SSR',
        },
        {
            indicatorName: 'Volume des consultations médicales',
            description: 'Les consultations peuvent être différentes selon la thématique: SSP (soins curatifs, santé mentale, …),' +
                ' RDR, SSR (nombre de CPN, de PF, d\'accouchements ou de consultations post-partum).',
            thematics: 'CrCo ENV MGR RdR SSR'
        }]
    }
];
