import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceEditComponent } from './data-source-edit.component';

describe('DataSourceEditComponent', () => {
  let component: DataSourceEditComponent;
  let fixture: ComponentFixture<DataSourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
