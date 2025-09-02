import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-aux-ag-icons',
    template: `<mat-icon [svgIcon]="getIcon(this.params.value)"></mat-icon>`,
    styles: [
        `
            :host {
                display: flex;
            }
        `,
    ],
    imports: [MatIcon],
})
export class AuxAgIconsComponent {
    params: any;
    agInit(params: any): void {
        this.params = params;
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            return 'US';
        } else if (language == 'SPANISH') {
            return 'ES';
        } else {
            return '';
        }
    }
}
