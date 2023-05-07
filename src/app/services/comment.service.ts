import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export type Comment = {
  id?: string;
  path: string;
  content: {
    comment?: string;
    comments?: {
      [key: string]: string;
    };
    filter: {
      project: string;
      dateStart: string;
      dateEnd: string;
      dimension: string;
      disaggregatedBy: { [key: string]: string };
    };
  }[];
};

export type CommentFilter = Comment['content'][number]['filter'];

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public currFilters: Omit<CommentFilter, 'disaggregatedBy'> | null = null;

  constructor(private apiService: ApiService) {}

  public async loadComments(paths: string[]): Promise<(Comment | undefined)[]> {
    const res = await this.apiService.post('/resources/comments', {
      paths
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const comments = (res as any) as Comment[];
    return paths.map(path => comments.find(comment => comment.path === path));
  }

  public removeComment(id: string): void {
    this.apiService.delete(`/resources/comment/${id}`);
  }

  public async saveComment(comment: Comment): Promise<void> {
    console.log('saving comment', comment);
    await this.apiService.put('/resources/comment', comment);
  }
}
