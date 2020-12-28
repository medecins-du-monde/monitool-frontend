import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting-menu',
  templateUrl: './reporting-menu.component.html',
  styleUrls: ['./reporting-menu.component.scss']
})
export class ReportingMenuComponent implements OnInit {

  @Input() indicator;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.indicator);
  }

}
