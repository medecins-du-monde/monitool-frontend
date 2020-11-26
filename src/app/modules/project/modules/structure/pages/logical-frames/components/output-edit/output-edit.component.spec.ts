import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputEditComponent } from './output-edit.component';

describe('OutputEditComponent', () => {
  let component: OutputEditComponent;
  let fixture: ComponentFixture<OutputEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
