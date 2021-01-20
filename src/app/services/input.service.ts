import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Input } from '../models/classes/input.model';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(
    private apiService: ApiService,
  ) { }

  public async save(input: Input) {
    const response: any = await this.apiService.put(`/resources/input/${input.id}`, input.serialize());
    const savedInput = new Input(response);
    return savedInput;
  }

  public async delete(input: Input) {
    const response: any = await this.apiService.delete(`/resources/input/${input.id}`);
    return response;
  }

  public async list(projectId: string, formId: string){
    const response = await this.apiService.get(
      `/resources/input?mode=ids_by_form`,
      {
        params: {
          projectId,
          formId
        }
      }
    );
    return response;
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
