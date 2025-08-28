import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataImportService {

  constructor(private apiService: ApiService) { }

  private uploadedData = {};
  
  private async readExcelFile(file: any, path: string) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedData[path] = [];
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
          for (const name of workbook.SheetNames) {
            const worksheet = workbook.Sheets[name];
            this.uploadedData[path].push({
              name: name,
              data: XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            });
          }
        resolve(workbook);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsBinaryString(file);
    });
  }

  public async importFile(file: any, path: string) {
    await this.readExcelFile(file, path);
    const data = this.uploadedData[path];
    delete this.uploadedData[path];
    return await this.apiService.put(`${path}/check`, data);
  }
}
