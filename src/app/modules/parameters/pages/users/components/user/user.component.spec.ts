import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/models/classes/user.model';

import { UserComponent } from './user.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(waitForAsync(() => {
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
