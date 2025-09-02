import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phonenumber',
    standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
    phoneMasked: string;

    transform(phone: any): any {
        if (phone === null) {
            return '';
        }

        if (phone === undefined) {
            return '';
        }

        if (phone === '') {
            return '';
        }

        const areacode = phone.substr(0, 3);
        const firstSegment = phone.substr(3, 3);
        const LastSegment = phone.substr(6, 4);
        this.phoneMasked = '(' + areacode + ') ' + firstSegment + '-' + LastSegment;

        return this.phoneMasked;
    }
}
