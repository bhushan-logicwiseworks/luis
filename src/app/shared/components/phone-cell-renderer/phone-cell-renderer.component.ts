import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';

@Component({
    selector: 'app-phone-cell-renderer',
    template: `
        <span class="phone-cell">
            {{ formattedPhone }}
            @if (params.value !== '' && params.value !== null && params.value !== undefined) {
                <mat-icon matPrefix class="icon-size-5" [svgIcon]="'phone_iphone'" (click)="makeCall($event)">
                </mat-icon>
            }
        </span>
    `,
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .phone-cell {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            mat-icon {
                cursor: pointer;
                margin-left: 10px;
            }
        `,
    ],
    standalone: true,
    imports: [MatIconModule],
    providers: [PhoneNumberPipe],
})
export class PhoneCellRendererComponent {
    params: any;
    formattedPhone: string = '';
    constructor(private phoneNumberPipe: PhoneNumberPipe) {}
    agInit(params: any): void {
        this.params = params;
        this.updatePhoneNumber(); // Update phone number when params change
    }

    private updatePhoneNumber(): void {
        if (this.params?.value) {
            this.formattedPhone = this.phoneNumberPipe.transform(this.params.value);
        }
    }

    makeCall(event: Event) {
        event.stopPropagation(); // Stop the event from propagating to the cell
        if (this.params && this.params.value) {
            window.location.href = `tel:${this.params.value}`;
        }
    }
}
