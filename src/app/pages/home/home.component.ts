import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  iconClicked = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeText() {
    if (this.iconClicked) {
      document.getElementById('changing-text').innerHTML = 'de monitoring (indicateurs et données), accompagné des baselines, cibles et collectes passées pour chacun d`eux.';
      document.getElementById('arrow-icon').innerHTML = 'keyboard_arrow_up';
    }
    else {
      document.getElementById('changing-text').innerHTML = 'Avec la mise à disposition des cadres logiques des autres projets et du plan..';
      document.getElementById('arrow-icon').innerHTML = 'keyboard_arrow_down';
    }
    this.iconClicked = !this.iconClicked;
  }
}
