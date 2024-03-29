import { Injectable, OnDestroy } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { Project } from '../models/classes/project.model';
import { Subscription } from 'rxjs';

export type Comment = {
  id?: string;
  path: string;
  content: {
    comment?: {
      value: string,
      cellValue?: string
    };
    comments?: {
      [key: string]: {
        value: string,
        cellValue?: string
      };
    };
    filter: {
      dimension: string;
      disaggregatedBy: { [key: string]: string };
    };
  }[];
};

export type CommentFilter = Comment['content'][number]['filter'];

/** Finds the content that has a matching filter  */
export const findContentIndexByFilter = (
  comment: Comment | undefined,
  filters: CommentFilter
): number => {
  return (
    comment?.content.findIndex(c => {
      const cFilters = c.filter;
      return (
        cFilters.dimension === filters.dimension &&
        isEqual(cFilters.disaggregatedBy, filters.disaggregatedBy)
      );
    }) ?? -1
  );
};

@Injectable({
  providedIn: 'root'
})
export class CommentService implements OnDestroy {
  public currFilters: Omit<CommentFilter, 'disaggregatedBy'> | null = null;
  private cachedComments: Comment[] | null;

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    this.subscription.add(
      this.projectService.projectId.subscribe(() => {
        this.cachedComments = null;
      })
    );
  }

  public getByPath(paths: string[]): (Comment | undefined)[] {
    const comments = this.projectService.project.getValue().comments || [];
    return paths.map(path => comments.find(comment => comment.path === path));
  }

  public stashComment(comment: Comment): void {
    // Only admin accounts can touch comments.
    const isAdmin = this.authService.user.getValue()?.role === 'admin';
    if (!isAdmin) { return; }

    if (!this.cachedComments) {
      this.cachedComments = this.projectService.project
        .getValue()
        .serialize().comments;
    }

    const allComments = cloneDeep(this.cachedComments) || [];

    // Check if there's a comment with the same id
    const oldComment = comment.id
      ? allComments.find(c => c.id === comment.id)
      : null;

    // If there's no comment with the same id, create a new one
    if (!oldComment) {
      // Adds id to the comment
      Object.assign(comment, { id: uuid() });

      // Adds the comment to the project
      this.projectService.setComments([...allComments, comment]);
      this.cachedComments = [...allComments, comment];
      return;
    }

    // If there's a comment with the same id, just replace the content
    oldComment.content = comment.content;
    this.projectService.setComments(allComments);
    this.cachedComments = allComments;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
