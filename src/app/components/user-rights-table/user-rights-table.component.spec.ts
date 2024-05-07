import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightsTableComponent } from './user-rights-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('UserRightsTableComponent', () => {
  let component: UserRightsTableComponent;
  let fixture: ComponentFixture<UserRightsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRightsTableComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
