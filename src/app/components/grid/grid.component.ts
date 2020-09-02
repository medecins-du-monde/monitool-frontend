import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public colsNumber = 8;

  @Input() items: any[];

  constructor() { }

  private gridBreakpoints = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };

  ngOnInit(): void {
    this.colsNumber = this.setColsNumber(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.colsNumber = this.setColsNumber(event.target.innerWidth);
  }

  private setColsNumber(width: number) {
    let breakpoint: string;
    switch ( true ) {
      case ( width < 600 ): {
        breakpoint = 'xs';
        break;
      }
      case ( width < 1024 ): {
        breakpoint = 'sm';
        break;
      }
      case ( width < 1440 ): {
        breakpoint = 'md';
        break;
      }
      case ( width < 1920 ): {
        breakpoint = 'lg';
        break;
      }
      default: {
        breakpoint = 'xl';
        break;
      }
    }
    return this.gridBreakpoints[breakpoint];
  }

}
