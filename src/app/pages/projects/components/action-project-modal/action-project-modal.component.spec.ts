import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProjectModalComponent } from './action-project-modal.component';

describe('CloneProjectModalComponent', () => {
  let component: ActionProjectModalComponent;
  let fixture: ComponentFixture<ActionProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
