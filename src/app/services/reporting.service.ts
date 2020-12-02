import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private apiService: ApiService) { }

  public TIME_PERIODICITIES = [
    'day', 'month_week_sat', 'month_week_sun', 'month_week_mon', 'week_sat', 'week_sun',
    'week_mon', 'month', 'quarter', 'semester', 'year'
  ];

  public async fetchData(project, computation,  dimensionIds, filter, withTotals, withGroups) {

  console.log(computation.parameters.length);
  if (computation.parameters.length === 0) {
    console.log("computation ", computation )
    let result = parseFloat(computation.formula);
  }


  const url = '/reporting/project/' + project._id;
  const data = {
    computation,
    dimensionIds,
    filter,
    withTotals,
    withGroups
  };

  //const response: any = await this.apiService.post(url, data);
  //console.log(response);
  }

}
