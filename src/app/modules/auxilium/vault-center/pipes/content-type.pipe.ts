import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contentType', })
export class ContentTypePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return value;
        }
        return value.substr(value.indexOf('/') + 1);
    }
}
