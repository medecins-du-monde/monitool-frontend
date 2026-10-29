import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Project } from 'src/app/models/classes/project.model';
import { CloneReview, ProjectService } from 'src/app/services/project.service';

// Must match CLONE_TAG_CONFIRMATIONS in the API (lib/utils/clone-review.js).
export const CLONE_TAG_CONFIRMATIONS = [
  'renamed', 'dates', 'sites', 'dataSources', 'logicalFrames', 'readyForInput', 'noDuplicate'
];

@Component({
  selector: 'app-remove-clone-tag-modal',
  templateUrl: './remove-clone-tag-modal.component.html',
  styleUrls: ['./remove-clone-tag-modal.component.scss']
})
export class RemoveCloneTagModalComponent implements OnInit {

  state: 'loading' | 'review' | 'saving' | 'success' | 'error' = 'loading';
  review: CloneReview;
  project: Project;

  readonly confirmationKeys = CLONE_TAG_CONFIRMATIONS;
  confirmations: Record<string, boolean> = {};

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<RemoveCloneTagModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.project = data.project;
  }

  get allConfirmed(): boolean {
    return this.confirmationKeys.every(key => this.confirmations[key] === true);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.review = await this.projectService.getCloneReview(this.project.id);
      this.state = 'review';
    } catch (error) {
      this.state = 'error';
    }
  }

  async onConfirm(): Promise<void> {
    if (!this.allConfirmed) {
      return;
    }
    this.state = 'saving';
    try {
      await this.projectService.removeCloneTag(this.project.id, this.confirmations);
      this.state = 'success';
    } catch (error) {
      this.state = 'error';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onClose(): void {
    this.dialogRef.close(this.state === 'success');
  }
}
