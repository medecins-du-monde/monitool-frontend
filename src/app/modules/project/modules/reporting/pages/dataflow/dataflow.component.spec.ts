import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataflowComponent } from './dataflow.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DataflowComponent', () => {
  let component: DataflowComponent;
  let fixture: ComponentFixture<DataflowComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataflowComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(),]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataflowComponent]
    });
    fixture = TestBed.createComponent(DataflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
