import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datetimeformat', })
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    //https://stackoverflow.com/questions/40526102/how-do-you-format-a-date-time-in-typescript

    transform(value: any, args?: any): any {
        if (value === '1900-01-01T00:00:00') {
            return '';
        } else {
            // 10/3/1967
            return super.transform(value, 'M/d/yyyy h:mm a');
        }
    }
}
