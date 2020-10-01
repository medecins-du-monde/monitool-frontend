import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-illustration',
  templateUrl: './home-illustration.component.html',
  styleUrls: ['./home-illustration.component.scss']
})
export class HomeIllustrationComponent implements OnInit {

  @Input() illustration: string;

  @Input() title: string;

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
