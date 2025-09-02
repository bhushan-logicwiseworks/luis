import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ac-html-renderer-component',
    template: ` <div #htmlRender></div> `,
    styles: [
        `
            div {
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
        `,
    ],
})
export class HtmlRendererComponentComponent {
    params: any;
    @ViewChild('htmlRender') htmlRender: ElementRef;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        this.params = params;
        return true;
    }

    ngAfterViewInit() {
        this.htmlRender.nativeElement.innerHTML = this.params.value;
    }
}
