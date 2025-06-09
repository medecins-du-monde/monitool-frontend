/* eslint-disable @typescript-eslint/dot-notation */
import * as XLSX from 'xlsx';
import { ElementRef, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import TimeSlot from 'timeslot-dag';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from './project.service';
import { TranslateService } from '@ngx-translate/core';
import { IndicatorService } from './indicator.service';
@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  public currReportTable = new BehaviorSubject<ElementRef>(null);

  constructor(
    private apiService: ApiService,
    private projectService: ProjectService,
    private indicatorService: IndicatorService,
    private translateService: TranslateService
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

  public async fetchData(project, computation,  dimensionIds, filter, withTotals, withGroups, refreshCache) {

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
      return {items: result};
    }


    const url = '/reporting/project/' + project._id;
    const data = {
      computation,
      dimensionIds,
      filter,
      withTotals,
      withGroups,
      refreshCache
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
      if (Object.prototype.hasOwnProperty.call(computation.parameters, key)) {
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
    const {html, itemId} = JSON.parse(sessionStorage.getItem(`currView:${id}`));
    if (!html) { throw new Error(); }

    // new div
    const table = document.createElement('TABLE');
    table.innerHTML = html;


    // remove all buttons
    const btnRegex = /<button.*?>(.*?)<\/button>/g;
    table.innerHTML = table.innerHTML.replace(
      btnRegex,
      ''
    );

    // remove all tooltips
    const tooltipRegex = /ng-reflect-message="(.*?)"/g;
    table.innerHTML = table.innerHTML.replace(
      tooltipRegex,
      ''
    );

    // remove inly add_circle and remove_circle icons
    const addRmBtnRegex = /<mat-icon[^>]*?>(add_circle|remove_circle)<\/mat-icon>/g;
    table.innerHTML = table.innerHTML.replace(
      addRmBtnRegex,
      ''
    );

    // replace 'do_disturb' icon with '🚫'
    const doDisturbRegex = /<mat-icon[^>]*?>do_disturb<\/mat-icon>/g;
    table.innerHTML = table.innerHTML.replace(
      doDisturbRegex,
      '🚫'
    );

    // remove all arrow_forward icons
    const arrowForwardRegex = /<mat-icon[^>]*?>arrow_forward<\/mat-icon>/g;
    table.innerHTML = table.innerHTML.replace(
      arrowForwardRegex,
      '►'
    );

    // remove all info icons
    const infoRegex = /<mat-icon[^>]*?>info<\/mat-icon>/g;
    table.innerHTML = table.innerHTML.replace(
      infoRegex,
      ''
    );

    // replace ‰ with decimal value
    const perThousandRegex = /(\d+)‰/g;
    table.innerHTML = table.innerHTML.replace(
      perThousandRegex,
      (_, p1) => `${parseInt(p1, 10) / 1000}`.replace('.', ',')
    );

    // get the header of the table
    const headers: string[] = [];
    const ths = table.querySelectorAll('th');
    for (const th of Array.from(ths)) {
      headers.push(th.innerText.trim());
    }
    headers.shift();
    headers[0] = 'Name';

    // get the padding values the tds in each row,
    // that will be used to determine the color of the row
    const trs = table.querySelectorAll('tr');
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

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, {
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
    a.download = await this.getFileName(itemId);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  private async getFileName(id: string): Promise<string> {
    let name = 'error';
    if (id.split(':')[0] === 'indicator') {
      await this.indicatorService.get(id).then(res => {
        name = res.name[this.translateService.currentLang];
      });
    } else if (id.split(':')[0] === 'project') {
      await this.projectService.get(id).then(res => name = res.country);
    }
    return `(${name})-${this.translateService.instant('export-current-minimized').toLowerCase().replaceAll(/\s+/g, '-')}.xlsx`;
  }

  /**
   * Save currReportingTable to localStorage
   *
   * @returns id to retrieve the table in localStorage
   */
  saveCurrentTableView(itemId: string): string {
    // generate random id
    const id = Math.random()
      .toString(36)
      .substring(2, 15);

    // get the table as a string
    const html = document.getElementById('general-report-table').innerHTML;

    // remove all buttons
    // const arrowForward = /<mat-icon.*?>arrow_forward<\/mat-icon>/g;
    // html = html.replace(
    //   arrowForward,
    //   ''
    // );

    // save the table in localStorage
    sessionStorage.setItem(
      `currView:${id}`,
      JSON.stringify({
        html,
        itemId,
      })
    );
    return id;
  }

  // TODO: Improve commas solution
  private csvJSON(csv: string){

    const lines = csv.split('\n');

    const result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length - 1; i++){

        const obj = {};
        const currentLine = lines[i].split(',');
        // const parsedLine = [];

        // for (let j = 0; j < line.length; j++) {
        //   if (line[j][0] === '"' && line[j][line[j].length - 1] !== '"') {
        //     let val = line[j];
        //     while (line[j][line[j].length - 1] !== '"') {
        //       j++;
        //       val += line[j];
        //     }
        //     parsedLine.push(val.substring(1, val.length - 1));
        //   } else {
        //     parsedLine.push(line[j]);
        //   }
        // }

        for (let j = 0; j < headers.length; j++) {
          const val = currentLine[j].replace(/{{COMMA}}/g, ',');
          if (val !== '') {
            if (j < 2) {
              obj['Name'] = val;
            } else {
              obj[headers[j]] = val;
            }
          }
        }

        result.push(obj);

    }

    // return result; //JavaScript object
    return result; // JSON
  }
}

