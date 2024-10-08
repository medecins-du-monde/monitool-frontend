import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
    component.form = new UntypedFormGroup({
      _start: new UntypedFormControl(new Date()),
      _end: new UntypedFormControl(new Date()),
      finished: new UntypedFormControl(false),
      entities: new UntypedFormControl([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
