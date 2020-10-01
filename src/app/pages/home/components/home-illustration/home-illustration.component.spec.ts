import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIllustrationComponent } from './home-illustration.component';

describe('HomeIllustrationComponent', () => {
  let component: HomeIllustrationComponent;
  let fixture: ComponentFixture<HomeIllustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
