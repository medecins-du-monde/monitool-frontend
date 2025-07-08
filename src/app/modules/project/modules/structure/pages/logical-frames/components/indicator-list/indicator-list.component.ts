import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-indicator-list',
  templateUrl: './indicator-list.component.html',
  styleUrls: ['./indicator-list.component.scss']
})
export class IndicatorListComponent {

  @Input() indicators = [];
  @Output() onEdit: EventEmitter<{indicator: any, i: number}> = new EventEmitter<{indicator: any, i: number}>();
  @Output() onDelete: EventEmitter<{i: number}> = new EventEmitter<{i: number}>();
  @Output() onDropIndicators: EventEmitter<any> = new EventEmitter<any>();

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(private translateService: TranslateService) {
  }

  itemDropped(event: any) {
    event.container = {...event.container, data: {indicator: this.indicators[event.previousIndex], index: event.currentIndex}};
    event.previousContainer = {...event.previousContainer, data: {indicator: this.indicators[event.previousIndex], index: event.previousIndex}};
    console.log(event.previousContainer)
    this.onDropIndicators.emit(event);
  }


}
