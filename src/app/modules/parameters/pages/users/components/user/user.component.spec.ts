import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/models/classes/user.model';

import { UserComponent } from './user.component';
import { MatMenuModule } from '@angular/material/menu';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot(),
        MatMenuModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = new User({
      id: 'test',
      type: 'test',
      rev: 'test',
      role: 'test',
      name: 'test',
      username: 'test',
      password: 'test',
      entities: [],
      dataSources: []
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
