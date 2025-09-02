import { IconModule } from '@abhinavakhil/iconify-angular';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ac-secondary-toolbar',
    templateUrl: './secondary-toolbar.component.html',
    styleUrls: ['./secondary-toolbar.component.scss'],
    standalone: true,
    imports: [CommonModule, IconModule, RouterModule, MatButtonModule, MatIconModule],
})
export class SecondaryToolbarComponent implements OnInit {
    @Input() current: string;
    @Input() crumbs: string[];

    constructor() {}

    ngOnInit() {}
}
