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

  /**
   * Save the input or update the blocked state.
   * Pass a full Input object to update all the fields on it.
   * Pass an object with the input id and the blocked state to only update that property.
   *
   * @param input Input object or a stripped version with just the id and the blocked value.
   * @returns The updated input.
   */
  public async save(input: Input | {id: string, blocked: boolean}) {
    input instanceof Input ? console.log('Input', input.serialize()) : console.log(input);
    const response: any = await this.apiService.put(`/resources/input/${input.id}`, input instanceof Input ?
      {
        action: 'saveInput',
        value: input.serialize()
      } : {
        action: 'toggleBlock',
        value: {_id: input.id, blocked: input.blocked}
      }
    );
    const savedInput = new Input(response);
    return savedInput;
  }

  public async delete(input: Input) {
    const response: any = await this.apiService.delete(`/resources/input/${input.id}`);
    // TODO: Convert it to an object to not have to manage arrayBuffer.
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
    // TODO: Convert it to an object to not have to manage arrayBuffer.
    return response;
  }

  /**
   * Clones all datasource inputs to the indicated datasource
   *
   * @param projectId Project where the clone is happening
   * @param datasourceToClone Id of the datasource to clone
   * @param newDatasource Id of the new datasource
   * @param newElements Array of dds for the new elements
   * @returns Response of the query
   */
  public async cloneDatasourceInputs(projectId: string, datasourceToClone: string, newDatasource: string, newElements: string[]){
    const response = await this.apiService.put(
      `/resources/input`,
      {
        mode: 'clone_datasource_input',
        projectId,
        formId: datasourceToClone,
        newFormId: newDatasource,
        newElementsId: newElements
      }
    );
    // TODO: Convert it to an object to not have to manage arrayBuffer.
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
// TODO: Convert it to an object to not have to manage arrayBuffer.
    return response;
  }

  public async getForDownload(projectId: string, formId: string){
    const response: any = await this.apiService.get(
      `/resources/input?mode=all`,
      {
        params: {
          projectId,
          formId
        }
      }
    );
// TODO: Convert it to an object to not have to manage arrayBuffer.
    return response;
  }
}
