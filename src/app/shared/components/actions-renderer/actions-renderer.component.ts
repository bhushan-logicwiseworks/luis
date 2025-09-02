import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ac-actions-rederer',
    template: `
        <span class="actions-cell">
            <button (click)="$event.stopPropagation()" [matMenuTriggerFor]="actionsMenu" mat-icon-button type="button">
                <mat-icon [svgIcon]="'mat_outline:more_vert'" size="24px"></mat-icon>
            </button>
            <mat-menu #actionsMenu="matMenu">
                @for (item of params.menuItems; track item) {
                    <button mat-menu-item (click)="item.action(params)">
                        <mat-icon [svgIcon]="item.icon" size="24px"></mat-icon>
                        {{ item.name }}
                    </button>
                }
            </mat-menu>
        </span>
    `,
    styles: [
        `
            .actions-cell {
                display: flex;
                align-items: center;
                justify-content: end;
            }
        `,
    ],
    imports: [
        MatIconButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        MatMenuItem,
    ],
})
export class ActionsRedererComponent implements OnInit {
    params: any;

    openMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    agInit(params: any): void {
        this.params = params;
    }

    constructor() {}

    ngOnInit(): void {}
}
