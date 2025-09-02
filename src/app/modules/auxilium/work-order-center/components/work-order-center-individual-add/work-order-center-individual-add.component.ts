import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WorkOrderAddComponent } from '../../../../../shared/components/auxilium/work-order-add/work-order-add.component';

@UntilDestroy()
@Component({
    selector: 'ac-work-order-center-individual-add',
    templateUrl: './work-order-center-individual-add.component.html',
    styleUrls: ['./work-order-center-individual-add.component.scss'],
    imports: [WorkOrderAddComponent],
})
export class WorkOrderCenterIndividualAddComponent {
    constructor() {}

    cancelContact(editMode: boolean | null = null): void {}

    /**
     * Save the contact
     */
    saveContact(): void {}
}
