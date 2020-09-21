import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

  public datasources: Form[] = [
    {
      id: 'ee005f45-e3da-4f7d-bde4-f44837cd224b',
      name: 'RAPPORT PSYCHOSOCIAUX',
      elements: [],
      start: new Date('2019-01-01'),
      end: new Date('2020-12-31'),
      entities: [],
      periodicity: 'month',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
