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


  public exportFilters = new BehaviorSubject<{
    logicalFrames: string[];
    dataSources: string[];
    crossCutting: boolean;
    extraIndicators: boolean;
    dimensionId: string;
    dateRange: {
      start: string;
      end: string;
    };
    entities: string[];
  } | null>(null);

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
   async downloadSavedTableView(id: string): Promise<void> {
    // retrieve html from localStorage
    const {html, project} = JSON.parse(localStorage.getItem(`currView:${id}`));
    if (!html) { throw new Error(); }

    // new div
    const div = document.createElement('table');
    div.innerHTML = html;

    console.log(div);

    const table = {
      nativeElement: div
    };

    // remove all buttons
    const btnRegex = /<button.*?>(.*?)<\/button>/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      btnRegex,
      ''
    );

    // remove all tooltips
    const tooltipRegex = /ng-reflect-message="(.*?)"/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      tooltipRegex,
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
    // replace ‰ with decimal value
    const perThousandRegex = /(\d+)‰/g;
    table.nativeElement.innerHTML = table.nativeElement.innerHTML.replace(
      perThousandRegex,
      (_, p1) => `${parseInt(p1, 10) / 1000}`.replace('.', ',')
    );

    // get the header of the table
    const headers: string[] = [];
    const ths = table.nativeElement.querySelectorAll('th');
    for (const th of Array.from(ths)) {
      headers.push(th.innerText.trim());
    }
    headers.shift();
    headers[0] = 'Name';

    // get the padding values the tds in each row,
    // that will be used to determine the color of the row
    const trs = table.nativeElement.querySelectorAll('tr');
    const paddingValues: number[] = [];
    for (const tr of Array.from(trs)) {
      const tds = tr.querySelectorAll('td');
      if (tds.length !== 0 && tds[0].innerText !== '') {
        paddingValues.push(0);
        continue;
      }
      let flag = false;
      for (const td of Array.from(tds)) {
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

    console.log(table.nativeElement);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement, {
      raw: true
    });

    // parse table to json, in order to send it to the server
    // (we can't do style stuff with the front-end library)
    const json = XLSX.utils.sheet_to_json(ws);
    json.forEach(row => {
      // Section titles ex: Logframes
      if (row['']) {
        row['Name'] = row[''];
        delete row[''];
      }
      // French support for non title rows
      else if (row['Nom']) {
        row['Name'] = row['Nom'];
        delete row['Nom'];
      }
      // Spanish support for non title rows
      else if (row['Nombre']) {
        row['Name'] = row['Nombre'];
        delete row['Nombre'];
      }
      // Remove arrow_forward for collection sites
      if (row['Name'] && row['Name'].startsWith('arrow_forward')) {
        row['Name'] = row['Name'].slice(13); // Length of arrow_forward
      }

    });

    console.log(json);

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
    a.download = `monitool-${project}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Save currReportingTable to localStorage
   *
   * @returns id to retrieve the table in localStorage
   */
  saveCurrentTableView(): string {
    // generate random id
    const id = Math.random()
      .toString(36)
      .substring(2, 15);

    // get the table as a string
    const html = document.getElementById('general-report-table').innerHTML;
    console.log(document.getElementById('general-report-table'));

    // save the table in localStorage
    localStorage.setItem(
      `currView:${id}`,
      JSON.stringify({
        html,
        project: this.projectService.project.getValue().country
      })
    );
    return id;
  }
}

