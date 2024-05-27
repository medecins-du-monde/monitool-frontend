import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { InformationsPanelComponent } from './informations-panel.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InformationsPanelComponent', () => {
  let component: InformationsPanelComponent;
  let fixture: ComponentFixture<InformationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformationsPanelComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()]
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
