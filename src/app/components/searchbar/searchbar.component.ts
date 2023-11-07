import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  @Input() project = true;
  @Output() search = new EventEmitter();

  public searchText: string;
  public searchTextUpdate = new Subject<string>();

  constructor() {
    // Debounce search.
    this.searchTextUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.search.emit(value);
      });
  }

}
