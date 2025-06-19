import { HintUserElement } from 'src/app/models/interfaces/hint-user-element.model';

export const HintUsers = [
  {value: 'admin', translation: 'AdminRole'},
  {value: 'project', translation: 'ProjectRole'},
  {value: 'common', translation: 'CommonRole'},
];

export const HintUserData: HintUserElement[] = [
    {untitled: 'TooltipRoleHint.General.0', admin: true, project: true, common: true},
    {untitled: 'TooltipRoleHint.General.1', admin: true, project: true, common: true},
    {untitled: 'TooltipRoleHint.General.2', admin: true, project: true, common: true},
    {untitled: 'TooltipRoleHint.General.3', admin: true, project: true, common: false},
    {untitled: 'TooltipRoleHint.General.4', admin: true, project: true, common: false},
    {untitled: 'TooltipRoleHint.General.5', admin: true, project: true, common: false},
    {untitled: 'TooltipRoleHint.General.6', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.General.7', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.General.8', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.General.9', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.General.10', admin: true, project: false, common: false},
  ];
