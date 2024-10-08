import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-illustration',
  templateUrl: './home-illustration.component.html',
  styleUrls: ['./home-illustration.component.scss']
})
export class HomeIllustrationComponent {

  @Input() illustration: string;

  @Input() title: string;

  @Input() text: string;

}
