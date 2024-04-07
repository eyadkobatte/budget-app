import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
@Pipe({
  name: 'dateAddMinus',
  standalone: true,
})
export class DateAddMinusPipe implements PipeTransform {
  transform(dateString: Date, days: number): Date {
    const date = DateTime.fromJSDate(dateString);
    if (!date.isValid) {
      throw new Error('Invalid date passed.');
    }
    const calculatedDate = date.plus({ days: days });
    return calculatedDate.toJSDate();
  }
}
