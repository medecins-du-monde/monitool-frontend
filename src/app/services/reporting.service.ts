import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import TimeSlot from 'timeslot-dag';

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

    // Missing information will return null for now. //
    if (!computation) {
      console.log('computation unavailable');
      return null;
    }

    if (filter.length === 0) {
      console.log('filter unavailable');
      return null;
    }

    // No need to load if the periodicity is not available.
    const periodicities = this.computeCompatiblePeriodicities(project, computation);
    console.log
    dimensionIds.forEach(dimensionId => {
      if (this.TIME_PERIODICITIES.includes(dimensionId) && !periodicities.includes(dimensionId)) {
        console.log('periodicity unavailable');
        return null;
      }
    });

    // No need to load if value is fixed.
    if (Object.keys(computation.parameters).length === 0) {
      const value =  parseFloat(computation.formula);
      let result = computation.formula;
      for (let i = dimensionIds.length - 1; i >= 0; --i) {
        const dimId = dimensionIds[i];
        const newResult = {};
        let ids;

        if (filter[dimId]) {
          ids = filter[dimId];
        }
        else if (periodicities.includes(dimId)) {
          ids = [];
          let slotStart = TimeSlot.fromDate(new Date(filter._start + 'T00:00:00Z'), dimId);
          let slotEnd = TimeSlot.fromDate(new Date(filter._end + 'T00:00:00Z'), dimId);
          ids.push(slotStart);
          while (slotStart !== slotEnd){
            slotStart = slotStart.next();
            ids.push(slotStart);
          }
          ids = ids.map(s => s._value);
        }
        else {
          console.log('could not find elements for ' + dimId);
        }
        ids.forEach(id => newResult[id] = value);
        if (withTotals) {
          newResult['_total'] = value;
        }
        result = newResult;
      }
      return result;
    }


    const url = '/reporting/project/' + project._id;
    const data = {
      computation,
      dimensionIds,
      filter,
      withTotals,
      withGroups
    };

    const response: any = await this.apiService.post(url, data);
    return response;
  }


  computeCompatiblePeriodicities(project, computation) {

    const variableIds = [];
    for (let key in computation.parameters) {
      if (computation.parameters.hasOwnProperty(key)) {
        variableIds.push(computation.parameters[key].elementId);
      }
    }

    const dsPeriodicities = project.forms
      .filter(ds => ds.elements.some(variable => variableIds.includes(variable.id)))
      .map(ds => ds.periodicity);

    return this.TIME_PERIODICITIES.filter(periodicity => {
      return dsPeriodicities.every(dsPeriodicity => {
        if (dsPeriodicity === 'free' || periodicity === dsPeriodicity) {
          return true;
        }
        try {
          let t = TimeSlot.fromDate(new Date(), dsPeriodicity);
          t.toParentPeriodicity(dsPeriodicity);
          return true;
        }
        catch (e) {
          return false;
        }

      });
    });
  }


}

