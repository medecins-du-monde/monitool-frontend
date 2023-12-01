import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFiltersComponent } from './user-filters.component';
import { TranslateModule } from '@ngx-translate/core';

describe('UserFiltersComponent', () => {
  let component: UserFiltersComponent;
  let fixture: ComponentFixture<UserFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFiltersComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
