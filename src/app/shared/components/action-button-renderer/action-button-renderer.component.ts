import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgStyle, NgClass } from '@angular/common';

@Component({
    selector: 'ac-action-button-renderer',
    template: `
        @for (item of params.menuItems; track item) {
            <ng-container>
                <button
                    class="relative"
                    mat-icon-button
                    (click)="onMenuItemClick(item)"
                    [matTooltip]="item.name"
                    matTooltipPosition="below"
                    type="button"
                    [disabled]="item.disabled ? item.disabled(params) : false"
                >
                    <mat-icon
                        [svgIcon]="item.icon"
                        [ngStyle]="isColorInline(item.color) ? { color: item.color } : null"
                        [ngClass]="!isColorInline(item.color) ? item.color : ''"
                    ></mat-icon>
                </button>
            </ng-container>
        }
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
        MatTooltip,
        MatIcon,
        NgStyle,
        NgClass,
    ],
})
export class ActionButtonRendererComponent {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }

    onMenuItemClick(item: any): void {
        event.stopPropagation();
        const action = this.params.menuItems.find(menuItem => menuItem.name === item.name);
        if (action) {
            action.action(this.params);
        }
    }

    isColorInline(color: string): boolean {
        return color && !color.startsWith('text-');
    }

    trackByFn(index: number, item: any): any {
        return item.name;
    }
}
