import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExcelPageComponent } from './download-excel-page.component';

describe('DownloadExcelPageComponent', () => {
  let component: DownloadExcelPageComponent;
  let fixture: ComponentFixture<DownloadExcelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadExcelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadExcelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
