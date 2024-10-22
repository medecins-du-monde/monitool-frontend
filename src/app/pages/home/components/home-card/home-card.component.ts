import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeCardComponent {

  @Input() icon?: string;

  @Input() content: InnerHTML;

}
