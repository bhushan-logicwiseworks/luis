import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import icCopy from '@iconify/icons-ic/twotone-content-copy';
import { MatButton } from '@angular/material/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { IconModule } from '@abhinavakhil/iconify-angular';

@Component({
    selector: 'ac-direct-link-display',
    templateUrl: './direct-link-display.component.html',
    styleUrls: ['./direct-link-display.component.scss'],
    imports: [
        MatButton,
        CdkCopyToClipboard,
        IconModule,
    ],
})
export class DirectLinkDisplayComponent implements OnInit {
    icCopy = icCopy;
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: { link: string },
        private ref: MatSnackBarRef<DirectLinkDisplayComponent>,
        private elementRef: ElementRef
    ) {}
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:keydown', ['$event'])
    onGlobalClick(event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            if (event.key === 'Esc') {
                this.ref.dismiss();
            }
            this.ref.dismiss();
        }
    }
    ngOnInit(): void {}

    copy() {
        this.ref.dismiss();
    }
}
