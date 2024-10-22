import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Form } from 'src/app/models/classes/form.model';

import { ActivityEditComponent } from './activity-edit.component';

describe('ActivityEditComponent', () => {
  let component: ActivityEditComponent;
  let fixture: ComponentFixture<ActivityEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityEditComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditComponent);
    component = fixture.componentInstance;
    component.forms = [
      new Form({
        id: 'id',
        name: 'name',
        start: new Date('2022-11-23T23:05:11.938Z'),
        end: new Date('2022-11-23T23:05:11.938Z'),
        periodicity: 'periodicity',
        elements: [],
        entities: []
      }) as any
    ];
    component.activityForm = new UntypedFormGroup({
      activities: new UntypedFormControl([]),
      indicators: new UntypedFormControl([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
