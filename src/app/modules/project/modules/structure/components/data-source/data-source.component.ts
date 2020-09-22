import { Component, Input, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  @Input() form: Form;

  periodicity: string;

  constructor() { }

  ngOnInit(): void {
    this.periodicity = 'EveryMonth';
  }

}
