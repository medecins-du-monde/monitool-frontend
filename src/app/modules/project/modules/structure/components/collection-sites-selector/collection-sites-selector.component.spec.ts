import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CollectionSitesSelectorComponent } from './collection-sites-selector.component';

describe('CollectionSitesSelectorComponent', () => {
  let component: CollectionSitesSelectorComponent;
  let fixture: ComponentFixture<CollectionSitesSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionSitesSelectorComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSitesSelectorComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      _start: new FormControl(new Date()),
      _end: new FormControl(new Date()),
      finished: new FormControl(false),
      entities: new FormControl([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
