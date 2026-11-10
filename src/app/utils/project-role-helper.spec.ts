import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Project } from '../models/classes/project.model';
import { User } from '../models/classes/user.model';
import { readRestrictionValidator } from '../modules/project/modules/structure/pages/users/components/user-modal/user-modal.component';
import ProjectRoleHelper from './project-role-helper';

describe('ProjectRoleHelper.getReadRestriction', () => {
  const lfA = '11111111-1111-4111-8111-111111111111';
  const lfB = '22222222-2222-4222-8222-222222222222';
  const dsX = '33333333-3333-4333-8333-333333333333';

  const buildProject = (users: any[]) => new Project({
    _id: 'project:p',
    entities: [],
    groups: [],
    forms: [{ id: dsX, name: 'X', entities: [], elements: [] }],
    logicalFrames: [
      { id: lfA, name: 'A', entities: [], indicators: [], purposes: [] },
      { id: lfB, name: 'B', entities: [], indicators: [], purposes: [] },
    ],
    users,
  });

  // Session users from /resources/myself only carry their id as _id.
  const internalSession = (id: string) => new User({ _id: id, type: 'user', role: 'common', name: 'Someone' });

  it('returns null for unrestricted read users', () => {
    const project = buildProject([{ type: 'internal', id: 'user:a', role: 'read' }]);
    expect(ProjectRoleHelper.getReadRestriction(internalSession('user:a'), project)).toBeNull();
  });

  it('returns null for owners, global admins and users not on the project', () => {
    const project = buildProject([{ type: 'internal', id: 'user:a', role: 'owner', logicalFrames: [lfA] }]);
    expect(ProjectRoleHelper.getReadRestriction(internalSession('user:a'), project)).toBeNull();
    expect(ProjectRoleHelper.getReadRestriction(new User({ _id: 'user:z', type: 'user', role: 'admin' }), project)).toBeNull();
    expect(ProjectRoleHelper.getReadRestriction(internalSession('user:other'), project)).toBeNull();
  });

  it('returns the logical frames of a restricted internal user', () => {
    const project = buildProject([{ type: 'internal', id: 'user:a', role: 'read', logicalFrames: [lfA], dataSources: [] }]);
    const restriction = ProjectRoleHelper.getReadRestriction(internalSession('user:a'), project);
    expect([...restriction.logicalFrameIds]).toEqual([lfA]);
    expect(restriction.dataSourceIds.size).toBe(0);
  });

  it('returns the data sources of a restricted partner', () => {
    const project = buildProject([
      { type: 'partner', name: 'Donor', username: 'donor', password: null, role: 'read', logicalFrames: [], dataSources: [dsX] },
    ]);
    const partner = new User({ type: 'partner', name: 'Donor', username: 'donor', role: 'read', projectId: 'project:p' });
    const restriction = ProjectRoleHelper.getReadRestriction(partner, project);
    expect(restriction.logicalFrameIds.size).toBe(0);
    expect([...restriction.dataSourceIds]).toEqual([dsX]);
  });

  it('treats empty lists as restricted to nothing', () => {
    const project = buildProject([{ type: 'internal', id: 'user:a', role: 'read', logicalFrames: [], dataSources: [] }]);
    const restriction = ProjectRoleHelper.getReadRestriction(internalSession('user:a'), project);
    expect(restriction).not.toBeNull();
    expect(restriction.logicalFrameIds.size + restriction.dataSourceIds.size).toBe(0);
  });

  it('round-trips the restriction through project serialization', () => {
    const project = buildProject([
      { type: 'internal', id: 'user:a', role: 'read', logicalFrames: [lfA, lfB], dataSources: [dsX] },
      { type: 'internal', id: 'user:b', role: 'read' },
    ]);
    expect(project.users[0].serialize()).toEqual(jasmine.objectContaining({ logicalFrames: [lfA, lfB], dataSources: [dsX] }));
    expect(project.users[1].serialize()).not.toEqual(jasmine.objectContaining({ logicalFrames: jasmine.anything() }));
  });

  it('drops the restriction lists when the edit form turns the restriction off', () => {
    const user = new User({ type: 'internal', id: 'user:a', role: 'read', restricted: false, logicalFrames: [], dataSources: [] });
    expect(user.restricted).toBeFalse();
    expect(Object.keys(user.serialize())).not.toContain('dataSources');
  });
});

describe('readRestrictionValidator', () => {
  const form = (value: any) => new UntypedFormGroup({
    role: new UntypedFormControl(value.role),
    restricted: new UntypedFormControl(value.restricted),
    logicalFrames: new UntypedFormControl(value.logicalFrames || []),
    dataSources: new UntypedFormControl(value.dataSources || []),
  });

  it('requires a selection only for restricted read users', () => {
    expect(readRestrictionValidator(form({ role: 'read', restricted: true }))).toEqual({ restrictionRequired: true });
    expect(readRestrictionValidator(form({ role: 'read', restricted: false }))).toBeNull();
    expect(readRestrictionValidator(form({ role: 'owner', restricted: true }))).toBeNull();
  });

  it('accepts a logical frame or a data source, but not the "all" pseudo-option alone', () => {
    expect(readRestrictionValidator(form({ role: 'read', restricted: true, logicalFrames: [{ id: 'lf' }] }))).toBeNull();
    expect(readRestrictionValidator(form({ role: 'read', restricted: true, dataSources: [{ id: 'ds' }] }))).toBeNull();
    expect(readRestrictionValidator(form({ role: 'read', restricted: true, dataSources: [{ id: 'all' }] })))
      .toEqual({ restrictionRequired: true });
  });
});
