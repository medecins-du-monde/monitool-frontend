import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableStructureComponent } from './table-structure.component';

describe('TableStructureComponent', () => {
  let component: TableStructureComponent;
  let fixture: ComponentFixture<TableStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableStructureComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStructureComponent);
    component = fixture.componentInstance;
    component.elementForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      entities: new FormControl([]),
      periodicity: new FormControl(''),
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
      elements: new FormArray([])
    });
    component.tableStructure = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
