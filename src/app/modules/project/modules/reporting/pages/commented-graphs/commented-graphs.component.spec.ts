import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedGraphsComponent } from './commented-graphs.component';

describe('CommentedGraphsComponent', () => {
  let component: CommentedGraphsComponent;
  let fixture: ComponentFixture<CommentedGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentedGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentedGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
