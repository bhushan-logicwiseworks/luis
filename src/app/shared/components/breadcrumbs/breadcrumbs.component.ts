import { Component, Input, OnInit } from '@angular/core';
import icHome from '@iconify/icons-ic/twotone-home';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterLink } from '@angular/router';
import { IconModule } from '@abhinavakhil/iconify-angular';

@Component({
    selector: 'ac-breadcrumbs',
    template: `
        <div class="flex items-center">
            <ac-breadcrumb>
                <a [routerLink]="['/']">
                    <ic-icon [icon]="icHome" class="dark:text-white" inline="true" size="20px"></ic-icon>
                </a>
            </ac-breadcrumb>
            @for (crumb of crumbs; track crumb) {
                <div class="mr-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-800"></div>
                <ac-breadcrumb>
                    <a class="dark:text-white" [routerLink]="[]">{{ crumb }}</a>
                </ac-breadcrumb>
            }
        </div>
    `,
    host: {
        class: 'ac-breadcrumbs dark:text-white',
    },
    imports: [
        BreadcrumbComponent,
        RouterLink,
        IconModule,
    ],
})
export class BreadcrumbsComponent implements OnInit {
    @Input() crumbs: string[] = [];

    icHome = icHome;

    constructor() {}

    ngOnInit() {}
}
