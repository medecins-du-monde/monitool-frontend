import { UntypedFormControl } from '@angular/forms';
import { Project } from '../models/classes/project.model';
import { urlValidator } from './url-validator';

describe('urlValidator', () => {
  const validate = (value: any) => urlValidator()(new UntypedFormControl(value));

  it('accepts http and https urls', () => {
    expect(validate('https://mdm.sharepoint.com/sites/project?id=1')).toBeNull();
    expect(validate('http://example.org')).toBeNull();
    expect(validate('  HTTPS://example.org/path  ')).toBeNull();
  });

  it('leaves empty values to the required validator', () => {
    expect(validate('')).toBeNull();
    expect(validate(null)).toBeNull();
  });

  it('rejects other schemes and malformed urls', () => {
    ['javascript:alert(1)', 'ftp://example.org', 'example.org', 'https://', 'https://exa mple.org', 'www.example.org']
      .forEach(value => expect(validate(value)).toEqual({ invalidUrl: true }));
  });
});

describe('Project links', () => {
  it('defaults to an empty list and always serializes it', () => {
    const project = new Project({ _id: 'project:p', entities: [], groups: [], forms: [], logicalFrames: [], users: [] });
    expect(project.links).toEqual([]);
    expect(project.serialize().links).toEqual([]);
  });

  it('round-trips links with trimmed values', () => {
    const project = new Project({
      _id: 'project:p', entities: [], groups: [], forms: [], logicalFrames: [], users: [],
      links: [{ id: '11111111-1111-4111-8111-111111111111', title: ' Docs ', url: ' https://example.org ' }]
    });
    expect(project.serialize().links).toEqual([
      { id: '11111111-1111-4111-8111-111111111111', title: 'Docs', url: 'https://example.org' }
    ]);
  });
});
