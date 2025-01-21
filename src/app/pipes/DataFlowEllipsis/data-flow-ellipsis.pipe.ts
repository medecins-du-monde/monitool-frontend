import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFlowEllipsis'
})
export class DataFlowEllipsisPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 26) {
      return value.substring(0, 24) + '...';
    } else {
      return value;
    }
  }

}
