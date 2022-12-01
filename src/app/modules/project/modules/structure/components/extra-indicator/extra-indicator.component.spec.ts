import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';

import { ExtraIndicatorComponent } from './extra-indicator.component';

describe('ExtraIndicatorComponent', () => {
  let component: ExtraIndicatorComponent;
  let fixture: ComponentFixture<ExtraIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraIndicatorComponent],
      imports: [TranslateModule.forRoot(), MatMenuModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraIndicatorComponent);
    component = fixture.componentInstance;
    component.extraIndicator = new ProjectIndicator({
      id: 'id',
      description: { en: 'description', es: 'description', fr: 'description' },
      display: 'display',
      baseline: 1,
      target: 1,
      colorize: true,
      unit: 'unit'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
