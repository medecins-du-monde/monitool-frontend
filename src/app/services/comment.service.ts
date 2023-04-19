import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

type Comment = (
  | {
      type: 'logicalFrame';
      id: string;
      nameComment?: string;
      goalComment?: string;
    }
  | {
      type: 'indicator';
      comment: string;
      column?: string;
      logicalFrame: string;
      purpose?: string | { description: string };
      output?: string | { description: string };
      form?: string;
      indicator?: string;
      // if comment is saved, we know it's id,
      id: string | { display: string };
    }
  | {
      type: 'purpose';
      id: string | { description: string };
      comment: string;
      logicalFrame: string;
    }
  | {
      type: 'output';
      id: string | { description: string };
      comment: string;
      logicalFrame: string;
      purpose: string | { description: string };
    }
  | {
      type: 'activity';
      id: string | { description: string };
      comment: string;
      logicalFrame: string;
      purpose: string | { description: string };
      output: string | { description: string };
    }
  | {
      type: 'crossCutting';
      nameComment?: string;
      multiThemeComment?: string;
    }
  | {
      type: 'theme';
      id: string;
      comment: string;
    }
  | {
      type: 'extraIndicators';
      comment: string;
    }
  | {
      type: 'dataSource';
      id: string;
      comment: string;
    }
) & {
  project: string;
  filter: CommentFilterT;
};

export type CommentFilterT = {
  entities: string[];
  dimensionId: string;
  dateRange: {
    start: string;
    end: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  computation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFilters: any;
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  public save(comment: Comment): Promise<ArrayBuffer> {
    return this.apiService.put('/resources/comment', {
      comment
    });
  }

}
