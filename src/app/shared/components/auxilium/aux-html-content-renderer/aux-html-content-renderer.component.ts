import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-aux-html-content-renderer',
    templateUrl: './aux-html-content-renderer.component.html',
    styleUrl: './aux-html-content-renderer.component.scss',
})
export class AuxHtmlContentRendererComponent implements AfterViewInit, OnChanges {
    @Input() htmlContent: string = '';
    @ViewChild('htmlRender') private htmlRender: ElementRef<HTMLElement>;
    shadowRoot: ShadowRoot;

    renderContnet() {
        if (this.htmlRender) {
            this.htmlRender.nativeElement.innerHTML = this.htmlContent;
        }
    }

    ngAfterViewInit() {
        this.renderContnet();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['htmlContent'] && changes['htmlContent'].currentValue !== changes['htmlContent'].previousValue) {
            this.renderContnet();
        }
    }
}
