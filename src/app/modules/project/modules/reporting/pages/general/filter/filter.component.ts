import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  collapsed = true;
  endDate: Date;
  selectedSites = [];

  @Input() startDate: Date;
  @Input() sites: any[];
  @Input() requestForm: FormGroup;

  @Output() filter: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  toggleCollapsed() {
    this.collapsed = this.collapsed ? false : true;
  }

  createFilter() {
    let filter = {};
    if (this.selectedSites.length > 0) {
      let entities = [];
      this.selectedSites.forEach(site => entities.push(site.id));
      filter =  {
                _start: this.transformDate(this.startDate),
                _end: this.transformDate(this.endDate),
                entity: entities
                };
    } else {
      filter = {_start: this.transformDate(this.startDate), _end: this.transformDate(this.endDate)};
    }
    this.requestForm.value.filter = filter;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear(); //we assume it is last day of the current year
    this.endDate = new Date(currentYear, 11, 31);
    this.createFilter();
  }

  onEntityRemoved(entity) {
    this.selectedSites = this.selectedSites.filter(site => site.id !== entity.id);
    this.createFilter();
  }

  addSite(site){
    site.forEach(s => {
      const exists = this.selectedSites.some(element => element.id === s.id);
      if (!exists) {
        const tempSite = {id: s.id, name: s.name};
        this.selectedSites.push(tempSite);
      }
    });
    this.createFilter();
  }

  transformDate(date: Date) {
    if (date) {
      const month = date.getMonth() + 1;
      const monthWithZero = month <= 9 ? '0'  + month.toString() : month.toString();

      const day = date.getDate();
      const dayWithZero = day <= 9 ? '0'  + day.toString() : day.toString();

      const tempDate = date.getFullYear() + '-' + monthWithZero + '-' + dayWithZero;
      return tempDate;
    }
  }

  onDateChange(event, where) {
    this.requestForm.value[where] = this.transformDate(event.value);
  }

}
