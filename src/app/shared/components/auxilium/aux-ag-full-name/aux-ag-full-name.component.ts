import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'aux-source-chip',
    template: `
        <div>
            <div class="md:flex">
                <div class="w-full">
                    <div>
                        <div class="text-black-500 inline-flex w-full items-center bg-transparent leading-none">
                            @if (params.data.self === false) {
                                <button
                                    [ngClass]="{ 'text-red-500': params.data.self === false }"
                                    class="relative mr-2"
                                    mat-icon-button
                                    matTooltip="No SELF Found"
                                    matTooltipPosition="after"
                                    type="button"
                                >
                                    <span
                                        class="inline-flex h-2 items-center justify-center rounded-full bg-red-600 px-1 text-sm text-white"
                                    ></span>
                                </button>
                            }
                            <span class="inline-flex w-full whitespace-nowrap">{{ params.data.fullName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [NgClass],
})
export class AuxAgFullNameComponent {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }
}
