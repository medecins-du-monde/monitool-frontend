import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { LogicalFramesListComponent } from './logical-frames-list.component';

describe('LogicalFramesListComponent', () => {
  let component: LogicalFramesListComponent;
  let fixture: ComponentFixture<LogicalFramesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogicalFramesListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFramesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
