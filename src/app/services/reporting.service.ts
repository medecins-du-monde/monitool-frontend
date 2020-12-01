import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private apiService: ApiService) { }

  public async fetchData(project, computation,  dimensionIds, filter, withTotals, withGroups) {

  const url = '/api/reporting/project/' + project._id;
  const data = {
    computation,
    dimensionIds,
    filter,
    withTotals,
    withGroups
  };

  const response: any = await this.apiService.post(url, data);
  console.log(response);
  }
}
