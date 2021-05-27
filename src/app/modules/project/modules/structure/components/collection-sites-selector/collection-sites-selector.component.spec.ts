import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSitesSelectorComponent } from './collection-sites-selector.component';

describe('CollectionSitesSelectorComponent', () => {
  let component: CollectionSitesSelectorComponent;
  let fixture: ComponentFixture<CollectionSitesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionSitesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSitesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
