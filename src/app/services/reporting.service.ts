// tslint:disable: no-string-literal
import * as XLSX from 'xlsx';
import { ElementRef, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import TimeSlot from 'timeslot-dag';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from './project.service';
@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  public currReportTable = new BehaviorSubject<ElementRef>(null);

  constructor(
    private apiService: ApiService,
    private projectService: ProjectService
  ) {}

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
        let ids = [];

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

  /** Downloads current reporting table view */
  async downloadCurrentTableView(): Promise<void> {
    const table = {
      nativeElement: this.currReportTable
        .getValue()
        .nativeElement.cloneNode(true)
    };

    // remove all buttons
    const btnRegex = /<button.*?>(.*?)<\/button>/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      btnRegex,
      ''
    );

    // remove inly add_circle and remove_circle icons
    const addRmBtnRegex = /<mat-icon.*?>(add_circle|remove_circle)<\/mat-icon>/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      addRmBtnRegex,
      ''
    );

    // replace 'do_disturb' icon with '🚫'
    const doDisturbRegex = /<mat-icon.*?>do_disturb<\/mat-icon>/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      doDisturbRegex,
      '🚫'
    );

    // get the header of the table
    const headers: string[] = [];
    const ths = table.nativeElement.querySelectorAll('th');
    for (const th of ths) headers.push(th.innerText);
    headers.shift();

    // get the padding values the tds in each row,
    // that will be used to determine the color of the row
    const trs = table.nativeElement.querySelectorAll('tr');
    const paddingValues: number[] = [];
    for (const tr of trs) {
      // console.log('new tr', tr)
      const tds = tr.querySelectorAll('td');
      if (tds.length !== 0 && tds[0].innerText !== '') {
        paddingValues.push(0);
        continue;
      }
      let flag = false;
      for (const td of tds) {
        if (td.style.paddingLeft) {
          paddingValues.push(
            (parseInt(td.style.paddingLeft.slice(0, -2), 10) + 10) / 10
          );
          flag = true;
          break;
        }
      }
      if (!flag) {
        paddingValues.push(1);
      }
    }
    paddingValues.shift();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement, {
      raw: true
    });

    // parse table to json, in order to send it to the server
    // (we can't do style stuff with the front-end library)
    const json = XLSX.utils.sheet_to_json(ws);
    json.forEach(row => {
      if (row['']) {
        row['Name'] = row[''];
        delete row[''];
      }
    });

    const file = await this.apiService.post(
      '/export/currentView',
      {
        data: json,
        paddings: paddingValues,
        headers
      },
      {
        responseType: 'blob'
      }
    );

    // save file to the user's computer
    const blob = new Blob([file], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // filename format is 'monitool-<project name>.xlsx'
    const projectCountry = this.projectService.project.getValue().country;
    a.download = `monitool-${projectCountry}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}

