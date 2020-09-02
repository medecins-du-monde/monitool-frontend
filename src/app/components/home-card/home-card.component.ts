import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeCardComponent implements OnInit {

  @Input() icon?: string;

  @Input() content: InnerHTML;

  constructor() { }

  ngOnInit(): void {
  }

}
