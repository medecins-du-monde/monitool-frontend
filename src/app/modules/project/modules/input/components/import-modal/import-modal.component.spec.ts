import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ImportModalComponent } from './import-modal.component';
import { ImportModalModule } from './import-modal.module';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataImportService } from 'src/app/services/data-import.service';

describe('ImportModalComponent', () => {
  let component: ImportModalComponent;
  let fixture: ComponentFixture<ImportModalComponent>;
  let service: jasmine.SpyObj<DataImportService>;

  const pick = (target: any = { files: [new Blob()], value: 'file.xlsx' }) => {
    component.onFileChange({ target });
    tick();
    fixture.detectChanges();
    return target;
  };
  const errorBox = (): HTMLElement => fixture.nativeElement.querySelector('.message.error');
  const text = (element: HTMLElement) => element.textContent.replace(/\s+/g, ' ').trim();

  beforeEach(() => {
    service = jasmine.createSpyObj('DataImportService', ['getFileSheets', 'importFile']);
    service.getFileSheets.and.resolveTo(['Paris']);
    service.importFile.and.resolveTo({ v: [1] } as any);

    TestBed.configureTestingModule({
      imports: [ImportModalModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        { provide: DataImportService, useValue: service },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        { provide: MAT_DIALOG_DATA, useValue: { path: '/check-path', siteName: 'Paris' } }
      ]
    });
    TestBed.inject(TranslateService).setTranslation('en', {
      import: { error: {
        generic: 'Generic error',
        'not-whole-number': 'Row {{row}}, column {{col}}: "{{value}}"',
        'duplicate-sheets': 'Duplicate sheets',
        'too-large': 'Too large'
      } }
    });
    TestBed.inject(TranslateService).use('en');

    fixture = TestBed.createComponent(ImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('enables the confirmation on a valid file', fakeAsync(() => {
    pick();
    expect(component.formatedData).toEqual({ v: [1] });
    expect(errorBox()).toBeNull();
  }));

  it('shows each error under its site and table, with its position', fakeAsync(() => {
    service.importFile.and.rejectWith({ status: 404, error: [
      { key: 'import.error.not-whole-number', extra: { element: 'Consultations', row: 3, col: 'A', value: '1.5' } },
      { key: 'import.error.not-whole-number', extra: { element: 'Cases', row: 8, col: 'B', value: '-2' } },
      { key: 'import.error.not-whole-number', extra: { element: 'Cases', row: 9, col: 'B', value: 'x' } }
    ] });
    pick();

    expect(component.formatedData).toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('.message.error').length).toBe(1);
    expect(errorBox().querySelector('.site').textContent).toBe('Paris');
    const tables = Array.from<HTMLElement>(errorBox().querySelectorAll('.table'));
    expect(tables.map(t => t.querySelector('.table-name').textContent)).toEqual(['Consultations', 'Cases']);
    expect(Array.from(tables[0].querySelectorAll('li')).map(li => li.textContent)).toEqual(['Row 3, column A: "1.5"']);
    expect(Array.from(tables[1].querySelectorAll('li')).map(li => li.textContent)).toEqual(['Row 8, column B: "-2"', 'Row 9, column B: "x"']);
  }));

  it('explains a file which cannot be read', fakeAsync(() => {
    service.getFileSheets.and.rejectWith(new Error('corrupted'));
    pick();
    expect(text(errorBox())).toContain('Generic error');
  }));

  it('explains sheets which cannot be told apart', fakeAsync(() => {
    service.getFileSheets.and.rejectWith({ key: 'import.error.duplicate-sheets' });
    pick();
    expect(text(errorBox())).toContain('Duplicate sheets');
  }));

  it('explains a file too large to be sent', fakeAsync(() => {
    service.importFile.and.rejectWith({ status: 413 });
    pick();
    expect(text(errorBox())).toContain('Too large');
  }));

  it('clears errors and can take the same file again, once corrected', fakeAsync(() => {
    service.importFile.and.rejectWith({ status: 404, error: [{ key: 'import.error.generic' }] });
    const target = pick();
    expect(target.value).toBe('');
    expect(errorBox()).not.toBeNull();

    service.importFile.and.resolveTo({ v: [2] } as any);
    pick();
    expect(errorBox()).toBeNull();
    expect(component.formatedData).toEqual({ v: [2] });
  }));

  it('does not keep the data of a previous file', fakeAsync(() => {
    pick();
    service.getFileSheets.and.resolveTo(['A', 'B']);
    pick();
    expect(component.sheets).toEqual(['A', 'B']);
    expect(component.formatedData).toBeUndefined();
  }));
});
