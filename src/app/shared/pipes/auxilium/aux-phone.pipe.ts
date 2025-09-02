import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

@Pipe({ name: 'phone', })
export class AuxPhonePipe implements PipeTransform {
    transform(rawNum) {
        if (!rawNum) {
            //return this.transform('202-456-1414');
            return '';
        }
        const num = PhoneNumberUtil.getInstance().parseAndKeepRawInput(rawNum, 'US');

        return PhoneNumberUtil.getInstance().format(num, PhoneNumberFormat.NATIONAL);
    }
}
