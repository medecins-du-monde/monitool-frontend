import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSaveComponent } from './project-save.component';

describe('ProjectSaveComponent', () => {
  let component: ProjectSaveComponent;
  let fixture: ComponentFixture<ProjectSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
