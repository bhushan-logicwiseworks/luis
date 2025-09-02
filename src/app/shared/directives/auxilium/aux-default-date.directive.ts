import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Directive({ selector: '[defaultDate]', })
export class DefaultDate {
    constructor(private control: NgControl) {}

    ngOnInit() {
        this.control.valueChanges.pipe(debounceTime(500)).subscribe(result => {
            if (result === '1900-01-01T00:00:00') {
                this.control.control.setValue(null);
            }
        });
    }
}
