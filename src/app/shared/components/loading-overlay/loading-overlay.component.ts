import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'ac-loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.scss'],
    animations: [
        trigger('fadeIn', [
            state('false', style({
                opacity: 0,
                visibility: 'hidden',
            })),
            state('true', style({
                opacity: 1,
                visibility: 'visible',
            })),
            transition('false <=> true', animate(`400ms cubic-bezier(0.35, 0, 0.25, 1)`)),
        ]),
    ],
    imports: [MatProgressBar, MatProgressSpinner],
})
export class LoadingOverlayComponent implements OnInit {
    @Input() show: boolean;
    @Input() type: 'spinner' | 'bar' = 'bar';
    @Input() diameter = 100;

    constructor() {}

    ngOnInit() {}
}
