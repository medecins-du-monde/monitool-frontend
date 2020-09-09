import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Output() search = new EventEmitter();

  public searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(e: any): void {
    this.search.emit(e);
  }

}
