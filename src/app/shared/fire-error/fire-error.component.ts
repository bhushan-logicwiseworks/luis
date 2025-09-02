import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-fire-error',
    templateUrl: './fire-error.component.html',
})
export class FireErrorComponent<T extends { code: string }> implements OnInit {
    @Input() error: T;

    constructor() {}

    ngOnInit(): void {}
}
