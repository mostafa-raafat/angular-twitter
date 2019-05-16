import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split(' - ')[1];
  }

}
