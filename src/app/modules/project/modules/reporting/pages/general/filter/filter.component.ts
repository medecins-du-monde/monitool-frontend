import { Component, OnInit, EventEmitter, Output, Input, OnChanges  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  userForm: FormGroup;
  collapsed = true;
  endDate: Date;
  selectedSites: any[];

  @Input() startDate: Date;
  @Input() sites: any[];

  @Output() filter: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  toggleCollapsed() {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnChanges(): void {
    const filter = {_start: this.transformDate(this.startDate), _end: this.transformDate(this.endDate)};
    this.filter.emit(filter);
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear(); //we assume it is last day of the current year
    this.endDate = new Date(currentYear, 11, 31);

    const tempObject = {_start: this.transformDate(this.startDate), _end: this.transformDate(this.endDate)};
    this.filter.emit(tempObject);

    console.log(this.sites);
  }

  onSiteRemoved(site){
    return null;
  }

  addSite(site){
    this.selectedSites.push(site);
  }

  transformDate(date: Date) {
    const month = date.getMonth() + 1;
    const monthWithZero = month <= 9 ? '0'  + month.toString() : month.toString();

    const day = date.getDate();
    const dayWithZero = day <= 9 ? '0'  + day.toString() : day.toString();

    const tempDate = date.getFullYear() + '-' + monthWithZero + '-' + dayWithZero;
    return tempDate;
  }


}
