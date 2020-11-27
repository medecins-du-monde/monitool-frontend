import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeEditComponent } from './purpose-edit.component';

describe('PurposeEditComponent', () => {
  let component: PurposeEditComponent;
  let fixture: ComponentFixture<PurposeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurposeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
