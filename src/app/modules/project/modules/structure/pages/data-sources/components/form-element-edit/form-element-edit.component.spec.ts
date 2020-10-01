import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementEditComponent } from './form-element-edit.component';

describe('FormElementEditComponent', () => {
  let component: FormElementEditComponent;
  let fixture: ComponentFixture<FormElementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
