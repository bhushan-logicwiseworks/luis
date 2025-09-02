import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
// import { Optional } from 'ag-grid-community';
import { PatientPhysicians } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians.interface';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { PatientPhysicianEditComponent } from './patient-physician-edit/patient-physician-edit.component';

@Component({
    selector: 'app-patient-physicians',
    templateUrl: './patient-physicians.component.html',
    styleUrls: ['./patient-physicians.component.scss'],
    imports: [
        LoadingOverlayComponent,
        MatDialogTitle,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatDialogClose,
        MatButton,
        PatientPhysicianEditComponent,
    ],
})
export class PatientPhysiciansComponent {
    physicianData: PatientPhysicians;
    editMode: boolean = false;
    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: PatientPhysicians) {
        this.physicianData = data;
    }
    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }
    }
}
