import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ac-email-source-chip',
    templateUrl: './email-source-chip.component.html',
    styleUrls: ['./email-source-chip.component.scss'],
    imports: [NgClass],
})
export class EmailSourceChipComponent implements OnInit {
    @Input() label: string;

    constructor() {}

    ngOnInit(): void {}

    getColor(label: string) {
        switch (label?.toUpperCase()) {
            case 'EMAIL':
                return ['bg-green-100', 'text-green-500'];

            case 'FORMSPREE':
                return ['bg-indigo-100', 'text-indigo-500'];

            case 'TASK':
                return ['bg-pink-100', 'text-pink-500'];

            case 'FAX':
                return ['bg-primary-light', 'text-primary'];

            case 'APP':
                return ['bg-red-200', 'text-red-500'];

            case 'TEXT':
                return ['bg-red-200', 'text-red-500'];

            case 'WOUND':
                return ['bg-yellow-200', 'text-yellow-500'];

            case 'VM':
                return ['bg-purple-200', 'text-purple-500'];

            case 'FAST':
                return ['bg-blue-200', 'text-blue-500'];

            case 'SALES':
                return ['bg-orange-500', 'text-orange-200'];

            case 'SELF':
                return ['bg-red-200', 'text-red-500'];
        }
    }
}
