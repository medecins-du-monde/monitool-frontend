import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { ProjectService } from 'src/app/services/project.service';

import { UsersComponent } from './users.component';

@Component({ selector: 'app-user', template: '' })
class UserStubComponent {
  @Input() user: User;
  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UserStubComponent],
      imports: [
        DragDropModule,
        MatDialogModule,
        MatIconModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editing a user', () => {
    let projectService: ProjectService;

    const editCard = (index: number, edited: User) => {
      const cards = fixture.debugElement.queryAll(By.directive(UserStubComponent));
      (cards[index].componentInstance as UserStubComponent).edit.emit(edited);
    };

    beforeEach(() => {
      projectService = TestBed.inject(ProjectService);
      projectService.project.next(new Project({
        _id: 'project:test',
        users: [
          { type: 'internal', id: 'user:alice', role: 'owner', name: 'Alice' },
          { type: 'internal', id: 'user:bob', role: 'read', name: 'Bob' },
          { type: 'partner', username: 'partner-old', name: 'Partner', role: 'read', password: null }
        ]
      }));
      fixture.detectChanges();
    });

    it('replaces the row and enables saving when the MDM account changes', () => {
      expect(projectService.hasPendingChanges).toBeFalse();

      editCard(1, new User({ type: 'internal', id: 'user:carol', role: 'read', name: 'Carol' }));

      expect(component.project.users.map(u => u.id ?? u.username)).toEqual(['user:alice', 'user:carol', 'partner-old']);
      expect(Object.keys(component.project.users)).not.toContain('-1');
      expect(projectService.hasPendingChanges).toBeTrue();
    });

    it('replaces the row when a partner login changes', () => {
      editCard(2, new User({ type: 'partner', username: 'partner-new', name: 'Partner', role: 'read', password: 'secret1' }));

      expect(component.project.users.map(u => u.id ?? u.username)).toEqual(['user:alice', 'user:bob', 'partner-new']);
    });

    it('replaces the row when the account type changes', () => {
      editCard(0, new User({ type: 'partner', username: 'alice-partner', name: 'Alice', role: 'owner', password: 'secret1' }));

      expect(component.project.users.map(u => u.type)).toEqual(['partner', 'internal', 'partner']);
      expect(component.project.users[0].username).toBe('alice-partner');
    });
  });
});
