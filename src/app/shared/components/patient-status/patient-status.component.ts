import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/auxilium/patient-center/patient.interface';

@Component({
    selector: 'ac-patient-status',
    templateUrl: './patient-status.component.html',
    styleUrls: ['./patient-status.component.scss'],
})
export class PatientStatusComponent implements OnInit {
    @Input() status: Patient['patientStatus'];

    agInit(params: any): void {
        this.status = params.value;
    }

    constructor() {}

    ngOnInit(): void {}
}
