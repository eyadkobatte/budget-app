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
      console.log(dateString, date);
      throw new Error(
        `Invalid date passed; Type: ${typeof dateString}, Value: ${dateString}`
      );
    }
    const calculatedDate = date.plus({ days: days });
    return calculatedDate.toJSDate();
  }
}
