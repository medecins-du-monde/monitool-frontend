import { Component, OnInit, Input } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: Sidenav;

  public activeGroup: string;

  constructor() { }

  ngOnInit(): void {
    this.activeGroup = this.sidenav.groups.length > 0 ? this.sidenav.groups[0].title : '';
  }

  public openGroup(title: string): void {
    this.activeGroup = (this.activeGroup === title) ? null : title;
  }

}
