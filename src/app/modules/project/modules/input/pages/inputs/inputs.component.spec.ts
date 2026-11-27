import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { InputsComponent } from './inputs.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { of } from 'rxjs';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatMenuModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('import from a site cell', () => {
    it('is offered to owners on every cell, and to input users on unlocked cells only', () => {
      component.isOwner = true;
      expect(component.canImportSite({ blocked: true })).toBeTrue();
      expect(component.canImportSite({})).toBeTrue();

      component.isOwner = false;
      (component as any).inputUserCanImport = true;
      expect(component.canImportSite({ blocked: false })).toBeTrue();
      expect(component.canImportSite({ blocked: true })).toBeFalse();

      (component as any).inputUserCanImport = false;
      expect(component.canImportSite({})).toBeFalse();
    });

    it('opens the import for that site only, in single-site mode', () => {
      const dialog = TestBed.inject(MatDialog);
      const open = spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(undefined) } as any);
      component.project = { id: 'project:1' } as any;
      component.formId = 'form';
      component.form = { elements: [] } as any;
      component.allowedEntities = [{ id: 'a', name: 'Site A' }, { id: 'b', name: 'Site B' }];
      (component as any).inputProgress = { 'input:project:1:form:b:2026-03': { progress: 1, blocked: true } };
      const row = { 'Site A': { value: -1 }, 'Site B': { value: 50 } };

      component.openMultiSiteImport('2026-03', 'March 2026', row, 'b');
      const data = open.calls.mostRecent().args[1].data as any;
      expect(data.single).toBeTrue();
      expect(data.sites).toEqual([{ id: 'b', name: 'Site B', locked: true }]);
      expect(data.periodLabel).toBe('March 2026');

      component.openMultiSiteImport('2026-03', 'March 2026', row);
      const all = open.calls.mostRecent().args[1].data as any;
      expect(all.single).toBeFalse();
      expect(all.sites.map(site => site.id)).toEqual(['a', 'b']);
    });
  });
});
