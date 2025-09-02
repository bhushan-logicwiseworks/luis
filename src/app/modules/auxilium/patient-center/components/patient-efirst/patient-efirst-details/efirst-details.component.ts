import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-efirst-details',
    templateUrl: './efirst-details.component.html',
    styleUrls: ['./efirst-details.component.scss'],
})
export class EFirstDetailsComponent implements AfterViewInit {
    @ViewChild('shadowElem') private shadowElem: ElementRef<HTMLElement>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngAfterViewInit(): void {
        if (this.shadowElem?.nativeElement) {
            const shadowDom = this.shadowElem.nativeElement.attachShadow({ mode: 'open' });
            const elem = document.createElement('div');
            shadowDom.appendChild(elem);
            elem.innerHTML = this.data.message;
        }
    }
}
