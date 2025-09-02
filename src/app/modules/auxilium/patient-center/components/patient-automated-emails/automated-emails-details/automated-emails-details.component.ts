import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-automated-emails-details',
    templateUrl: './automated-emails-details.component.html',
    styleUrls: ['./automated-emails-details.component.scss'],
})
export class AutomatedEmailsDetailsComponent implements AfterViewInit {
    @ViewChild('shadowElem') private shadowElem: ElementRef<HTMLElement>;
    htmlData;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.htmlData = data.dynamicComponentData;
    }

    ngAfterViewInit(): void {
        if (this.shadowElem?.nativeElement) {
            const shadowDom = this.shadowElem.nativeElement.attachShadow({ mode: 'open' });
            const elem = document.createElement('div');
            shadowDom.appendChild(elem);
            elem.innerHTML = this.htmlData.message;
        }
    }
}
