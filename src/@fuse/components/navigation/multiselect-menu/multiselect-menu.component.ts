import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseNavigationItem } from '../navigation.types';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-multiselect-menu',
    templateUrl: './multiselect-menu.component.html',
    styleUrls: ['./multiselect-menu.component.scss'],
    imports: [
        NgClass,
        RouterLink,
        MatIcon,
    ],
})
export class MultiselectMenuComponent {
    @Input() menuData: FuseNavigationItem[] = [];
    queryParams: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe(res => {
            if (this.isEmpty(res['params'])) {
                const newParams = { status: 'error', dateRange: 'today' };
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: newParams,
                    queryParamsHandling: 'merge',
                });
            } else {
                this.queryParams = { ...res['params'] };
            }
        });
    }

    updateQueryParams(key: string, value: string): void {
        this.queryParams = { ...this.queryParams, [key]: value };
        this.router.navigate([], { relativeTo: this.route, queryParams: this.queryParams });
    }

    isActive(menu): boolean {
        return menu && this.queryParams[menu.key] === menu.value;
    }

    isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }
        return true;
    }
}
