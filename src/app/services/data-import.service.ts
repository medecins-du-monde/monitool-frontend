import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from './api.service';
import { ImportValues } from '../utils/import-diff';

export interface ImportedSheet {
  name: string;
  data: any[][];
}

export interface SitePreview {
  status: 'ok' | 'invalid';
  errors?: { key: string; extra?: any }[];
  incoming?: ImportValues;
  existing?: ImportValues | null;
  rev?: string | null;
  blocked?: boolean;
  blank?: boolean;
  structureHash?: string;
}

export interface SiteCommit {
  siteId: string;
  baseRev: string | null;
  confirmClear?: boolean;
  values: ImportValues;
}

/**
 * XLSX reads an error cell as blank, and drops a formula with no cached result. Importing
 * either as an empty cell could clear a value: turn them into text, which fails validation.
 * Totals are formulas too, but they are not read.
 */
export function markUnreadableCells(worksheet: XLSX.WorkSheet): void {
  Object.keys(worksheet).filter(address => address[0] !== '!').forEach(address => {
    const cell = worksheet[address];
    if (cell.t === 'e') {
      worksheet[address] = { t: 's', v: cell.w || '#ERROR!' };
    } else if (cell.f && (cell.v === undefined || cell.t === 'z')) {
      worksheet[address] = { t: 's', v: '=' + cell.f };
    }
  });
}

@Injectable({
  providedIn: 'root'
})
export class DataImportService {

  constructor(private apiService: ApiService) { }

  public async getFileSheets(file: Blob): Promise<string[]> {
    return (await this.readWorkbook(file)).map(sheet => sheet.name);
  }

  public async importFile(file: Blob, path: string, sheetIndex?: number) {
    let sheets = await this.readWorkbook(file);
    if (typeof sheetIndex === 'number' && sheets[sheetIndex]) {
      sheets = [sheets[sheetIndex]];
    }
    return await this.apiService.put(`${path}/check`, sheets);
  }

  /**
   * Read all sheets of a workbook. Throws {key} if sheets can't be told apart: XLSX stores
   * them by name, so sheets with the same name would silently become a single one.
   */
  public readWorkbook(file: Blob): Promise<ImportedSheet[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(this.parseWorkbook(e.target.result as string));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsBinaryString(file);
    });
  }

  public parseWorkbook(content: string): ImportedSheet[] {
    const workbook = XLSX.read(content, { type: 'binary', sheetStubs: true, cellFormula: true });
    const names = workbook.SheetNames.map(name => name.toLowerCase());
    if (new Set(names).size !== names.length) {
      throw { key: 'import.error.duplicate-sheets' };
    }

    return workbook.SheetNames.map(name => {
      const worksheet = workbook.Sheets[name];
      markUnreadableCells(worksheet);
      return { name, data: XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][] };
    });
  }

  private multiSitePath(projectId: string, formId: string, period: string): string {
    return `/resources/project/${projectId}/data-source-all-sites/${formId}/${period}`;
  }

  public previewSite(projectId: string, formId: string, period: string, siteId: string, data: any[][]): Promise<SitePreview> {
    return this.apiService.put(`${this.multiSitePath(projectId, formId, period)}/${siteId}/preview`, { data }) as Promise<any>;
  }

  public commitSites(projectId: string, formId: string, period: string, structureHash: string, sites: SiteCommit[]): Promise<any> {
    return this.apiService.put(`${this.multiSitePath(projectId, formId, period)}/commit`, { structureHash, sites });
  }
}
