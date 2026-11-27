import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { InformationsPanelComponent } from './informations-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppVersionService } from 'src/app/services/app-version.service';

describe('InformationsPanelComponent', () => {
  let component: InformationsPanelComponent;
  let fixture: ComponentFixture<InformationsPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InformationsPanelComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()],
      providers: [
        { provide: AppVersionService, useValue: { hardRefresh: () => Promise.resolve() } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
