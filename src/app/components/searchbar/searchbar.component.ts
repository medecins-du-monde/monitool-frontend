import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  @Output() search = new EventEmitter();

  public searchText: string;

  onSearch(e: any): void {
    this.search.emit(e);
  }

}
