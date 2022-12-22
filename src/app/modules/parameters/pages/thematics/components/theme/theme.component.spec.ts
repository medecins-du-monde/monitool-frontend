import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Theme } from 'src/app/models/classes/theme.model';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(), MatMenuModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    component.theme = new Theme({
      id: 'id',
      type: 'theme',
      name: {
        fr: 'fr',
        en: 'en',
        es: 'es'
      },
      shortName: {
        fr: 'fr',
        en: 'en',
        es: 'es'
      },
      rev: 'rev'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
