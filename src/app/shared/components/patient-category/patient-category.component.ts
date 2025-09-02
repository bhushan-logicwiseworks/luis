import { Component, Input } from '@angular/core';
import { Patient } from '../../interfaces/auxilium/patient-center/patient.interface';

@Component({
    selector: 'ac-patient-category',
    templateUrl: './patient-category.component.html',
    styleUrls: ['./patient-category.component.scss'],
})
export class PatientCategoryComponent {
    @Input() category: Patient['patientCategory'];
}
