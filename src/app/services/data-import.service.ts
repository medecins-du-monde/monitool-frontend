import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataImportService {

  constructor(private apiService: ApiService) { }

  private uploadedData = {};

  public importFile(file: any, path: string) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
    this.uploadedData[path] = [];
    const workbook = XLSX.read(e.target.result, { type: 'binary' });
      for (const name of workbook.SheetNames) {
        const worksheet = workbook.Sheets[name];
        this.uploadedData[path].push({
          name: name,
          data: XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        });
      }
      console.log('Excel data:', this.uploadedData[path]);
    };
    reader.readAsBinaryString(file);
    this.testData(path);
  }

  private async testData(path: string) {
    console.log(path);
    const response: any = await this.apiService.put(`${path}/check`, this.uploadedData[path]);
    return response;
  }
}
