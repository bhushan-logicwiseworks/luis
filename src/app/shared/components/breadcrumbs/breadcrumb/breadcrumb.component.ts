import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ac-breadcrumb',
    template: ` <ng-content></ng-content> `,
    styles: [],
    host: {
        class: 'ac-breadcrumb font-medium text-secondary text-sm text-hint leading-none hover:text-primary no-underline trans-ease-out mr-2',
    },
})
export class BreadcrumbComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
