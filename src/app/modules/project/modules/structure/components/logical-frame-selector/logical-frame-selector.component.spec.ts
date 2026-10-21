import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';

import { LogicalFrameSelectorComponent } from './logical-frame-selector.component';

describe('LogicalFrameSelectorComponent', () => {
  let component: LogicalFrameSelectorComponent;
  let fixture: ComponentFixture<LogicalFrameSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogicalFrameSelectorComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFrameSelectorComponent);
    component = fixture.componentInstance;
    component.logicalFrames = [
      new LogicalFrame({
        id: 'id',
        name: 'name',
        entities: []
      })
    ];
    component.userForm = new UntypedFormGroup({
      logicalFrames: new UntypedFormArray([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
