import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourcesListComponent } from './data-sources-list.component';

describe('DataSourcesListComponent', () => {
  let component: DataSourcesListComponent;
  let fixture: ComponentFixture<DataSourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
