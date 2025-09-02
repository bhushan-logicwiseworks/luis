import { Icon, IconModule } from '@abhinavakhil/iconify-angular';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'ac-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    animations: [fadeInUp400ms],
    imports: [MatRipple, IconModule],
})
export class ActionButtonComponent implements OnInit {
    @Input() icon: Icon;

    constructor() {}

    ngOnInit(): void {}
}
