import { Component } from '@angular/core';

@Component({
    selector: 'ac-word-wrap-renderer',
    template: `
        <div style="white-space: nowrap;">
            <div style="white-space: normal; word-break: break-word;">
                {{ params.value }}
            </div>
        </div>
    `,
})
export class WordWrapRendererComponent {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }
}
