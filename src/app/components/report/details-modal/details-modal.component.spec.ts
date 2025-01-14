import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';

import { DetailsModalComponent } from './details-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from 'src/app/models/classes/project.model';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        LocalizedDatePipeModule,
        TranslateModule.forRoot(),
      ],
      declarations: [DetailsModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    });
    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
    component.data = {
      type: 'crossCutting',
      details: {name: 'TEST NAME'},
      project: new Project()
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
