import { Component } from '@angular/core';
import { WorkOrderAddComponent } from '../../../../../../shared/components/auxilium/work-order-add/work-order-add.component';

@Component({
    selector: 'app-add-edit-patient-workorder',
    templateUrl: './add-edit-patient-workorder.component.html',
    styleUrls: ['./add-edit-patient-workorder.component.scss'],
    imports: [WorkOrderAddComponent],
})
export class AddEditPatientWorkorderComponent {}
