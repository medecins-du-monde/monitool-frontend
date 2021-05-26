// tslint:disable: no-string-literal
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
      return null;
    }

    if (filter.length === 0) {
      return null;
    }

    // No need to load if the periodicity is not available.
    const periodicities = this.computeCompatiblePeriodicities(project, computation);
    dimensionIds.forEach(dimensionId => {
      if (this.TIME_PERIODICITIES.includes(dimensionId) && !periodicities.includes(dimensionId)) {
        return null;
      }
    });

    // No need to load if value is fixed.
    if (Object.keys(computation.parameters).length === 0) {
      const value = computation.formula === null ? null : parseFloat(computation.formula);
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
          const slotEnd = TimeSlot.fromDate(new Date(filter._end + 'T00:00:00Z'), dimId);
          ids.push(slotStart);
          while (slotStart !== slotEnd){
            slotStart = slotStart.next();
            ids.push(slotStart);
          }
          ids = ids.map(s => s._value);
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

    try {
      const response: any = await this.apiService.post(url, data);
      return response;
    } catch {
      return null;
    }


  }


  computeCompatiblePeriodicities(project, computation) {
    const variableIds = [];
    for (const key in computation.parameters) {
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
          const t = TimeSlot.fromDate(new Date(), dsPeriodicity);
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

