import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean;

  constructor() { }

  ngOnInit() {
    window.onresize = () => this.isMobile = window.innerWidth < 600;
  }
}
