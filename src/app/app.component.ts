import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MDM-monitool-Frontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'add-folder',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/add-folder.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'person',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/person.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/search.svg')
    );
  }
}
