import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TableStructureComponent } from './table-structure.component';

describe('TableStructureComponent', () => {
  let component: TableStructureComponent;
  let fixture: ComponentFixture<TableStructureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableStructureComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStructureComponent);
    component = fixture.componentInstance;
    component.elementForm = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      entities: new UntypedFormControl([]),
      periodicity: new UntypedFormControl(''),
      start: new UntypedFormControl(new Date()),
      end: new UntypedFormControl(new Date()),
      elements: new UntypedFormArray([])
    });
    component.tableStructure = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
