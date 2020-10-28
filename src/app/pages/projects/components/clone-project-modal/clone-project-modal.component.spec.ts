import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneProjectModalComponent } from './clone-project-modal.component';

describe('CloneProjectModalComponent', () => {
  let component: CloneProjectModalComponent;
  let fixture: ComponentFixture<CloneProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
