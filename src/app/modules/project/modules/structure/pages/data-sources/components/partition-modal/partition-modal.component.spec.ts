import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionModalComponent } from './partition-modal.component';

describe('PartitionModalComponent', () => {
  let component: PartitionModalComponent;
  let fixture: ComponentFixture<PartitionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
