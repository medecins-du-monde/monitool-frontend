import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Input } from '../models/input.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  // input: BehaviorSubject<Input> = new BehaviorSubject(new Input());

  constructor(
    private apiService: ApiService,
  ) { }

  public async save(input: Input) {
    const response: any = await this.apiService.put(`/resources/input/${input.id}`, input.serialize());
    const savedInput = new Input(response);
    return savedInput;
  }

  public async get(projectId: string, entityId: string, formId: string, period: string){
    const response: any = await this.apiService.get(
      `/resources/input?mode=current%2Blast`,
      {
        params: {
          projectId,
          entityId,
          formId,
          period
        }
      }
    );

    return response;
  }
}
