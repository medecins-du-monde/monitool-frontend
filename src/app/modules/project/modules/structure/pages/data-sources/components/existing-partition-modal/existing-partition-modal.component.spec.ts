import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPartitionModalComponent } from './existing-partition-modal.component';

describe('ExistingPartitionModalComponent', () => {
  let component: ExistingPartitionModalComponent;
  let fixture: ComponentFixture<ExistingPartitionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingPartitionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingPartitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
