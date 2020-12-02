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
      console.log('no computation available');
      return null;
    }

    if (filter.length === 0) {
      console.log('no filter available');
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
      console.log("IN");
      let result = parseFloat(computation.formula);

      for (let i = dimensionIds.length - 1; i >= 0; --i) {
        const dimId = dimensionIds[i];
        const newResult = {};
        let ids;
        /*
        if (filter[dimId]) {
          ids = filter[dimId];
        }
        else if (periodicities.includes(dimId)) {
          ids = Array.from(
            timeSlotRange(
              TimeSlot.fromDate(new Date(filter._start + 'T00:00:00Z'), dimId),
              TimeSlot.fromDate(new Date(filter._end + 'T00:00:00Z'), dimId)
            )
          ).map(s => s.value);
        }
        else {
          throw new Error('could not find elements for ' + dimId)
        }
        ids.forEach(id => newResult[id] = result);
        if (withTotals) {
          newResult._total = result;
        }
        result = newResult;*/
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
    console.log(variableIds);

    const dsPeriodicities = project.forms
      .filter(ds => ds.elements.some(variable => variableIds.includes(variable.id)))
      .map(ds => ds.periodicity);

    return this.TIME_PERIODICITIES.filter(periodicity => {
      return dsPeriodicities.every(dsPeriodicity => {
        if (dsPeriodicity === 'free' || periodicity === dsPeriodicity) {
          return true;
        }
        /*
        try {
          let t = TimeSlot.fromDate(new Date(), dsPeriodicity);
          t.toUpperSlot(periodicity);
          return true;
        }
        catch (e) {
          return false;
        }*/

      });
    });
  }


}

