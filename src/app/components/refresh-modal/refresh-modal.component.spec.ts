import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshModalComponent } from './refresh-modal.component';

describe('RefreshModalComponent', () => {
  let component: RefreshModalComponent;
  let fixture: ComponentFixture<RefreshModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
