import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { CLONE_TAG_CONFIRMATIONS, RemoveCloneTagModalComponent } from './remove-clone-tag-modal.component';

describe('RemoveCloneTagModalComponent', () => {
  let component: RemoveCloneTagModalComponent;
  let fixture: ComponentFixture<RemoveCloneTagModalComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<RemoveCloneTagModalComponent>>;

  beforeEach(async () => {
    projectService = jasmine.createSpyObj('ProjectService', ['getCloneReview', 'removeCloneTag']);
    projectService.getCloneReview.and.resolveTo({
      original: null, sameNameAsOriginal: false, originalModifiedSince: null, similarProjects: []
    });
    projectService.removeCloneTag.and.resolveTo(new Project());
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [RemoveCloneTagModalComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ProjectService, useValue: projectService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { project: new Project({ _id: 'project:1', clonedAt: '2026-01-01T00:00:00Z' }) } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveCloneTagModalComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
  });

  it('should not remove the tag until every confirmation is checked', async () => {
    CLONE_TAG_CONFIRMATIONS.slice(1).forEach(key => component.confirmations[key] = true);
    expect(component.allConfirmed).toBeFalse();
    await component.onConfirm();
    expect(projectService.removeCloneTag).not.toHaveBeenCalled();

    component.confirmations[CLONE_TAG_CONFIRMATIONS[0]] = true;
    expect(component.allConfirmed).toBeTrue();
    await component.onConfirm();
    expect(projectService.removeCloneTag).toHaveBeenCalled();
    expect(component.state).toBe('success');
  });

  it('should close without changing the project on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
    expect(projectService.removeCloneTag).not.toHaveBeenCalled();
  });
});
