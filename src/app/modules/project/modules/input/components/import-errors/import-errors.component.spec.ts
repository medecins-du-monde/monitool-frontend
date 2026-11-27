import { TestBed } from '@angular/core/testing';
import { ImportErrorsComponent } from './import-errors.component';
import { ImportErrorsModule } from './import-errors.module';

describe('ImportErrorsComponent', () => {
  it('shows each error under its site and table', () => {
    TestBed.configureTestingModule({ imports: [ImportErrorsModule] });
    const fixture = TestBed.createComponent(ImportErrorsComponent);
    fixture.componentInstance.group = {
      site: 'Paris',
      messages: ['Row 40 is outside the tables'],
      tables: [{ name: 'Consultations', messages: ['Row 3', 'Row 4'] }, { name: 'Cases', messages: ['Row 8'] }]
    };
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.site').textContent).toBe('Paris');
    const tables = Array.from(element.querySelectorAll('.table'));
    expect(tables.map(t => t.querySelector('.table-name').textContent)).toEqual(['Consultations', 'Cases']);
    expect(Array.from(tables[0].querySelectorAll('li')).map(li => li.textContent)).toEqual(['Row 3', 'Row 4']);
    expect(Array.from(tables[1].querySelectorAll('li')).map(li => li.textContent)).toEqual(['Row 8']);
    expect(element.textContent).toContain('Row 40 is outside the tables');
  });
});
