import { HintUserElement } from 'src/app/models/interfaces/hint-user-element.model';


export const HintUserData: HintUserElement[] = [
    {untitled: 'TooltipRoleHint.EditProjectsStructure', admin: true, project: true, common: true},
    {untitled: 'TooltipRoleHint.SeeAllProjectsReporting', admin: true, project: true, common: true},
    {untitled: 'TooltipRoleHint.CreateProjects', admin: true, project: true, common: false},
    {untitled: 'TooltipRoleHint.CreateAndEditThematics', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.CreateAndEditCrossCutting', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.EditOtherUsersRoles', admin: true, project: false, common: false},
    {untitled: 'TooltipRoleHint.EditAllProjectsStructureAndData', admin: true, project: false, common: false},
  ];
