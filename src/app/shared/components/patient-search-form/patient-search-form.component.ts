import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatLabel,
    MatSuffix,
} from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientCenterTableActions } from 'app/modules/auxilium/patient-center/actions/patient-center-table.actions';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormSerarchInputValues } from 'app/shared/components/auxilium/patient-search.enum';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import Swal from 'sweetalert2';
// import { Optional } from 'ag-grid-community';
import { NgClass } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-patient-search-form',
    templateUrl: './patient-search-form.component.html',
    styleUrls: ['./patient-search-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
        provideNativeDateAdapter(),
    ],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        NgxMaskDirective,
    ],
})
export class PatientSearchFormComponent {
    searchForm: FormGroup;
    isShortcut: boolean = false;
    dateFormat: string = constVariables.DATE_FORMAT;
    /**
     * Constructor
     */
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        public matDialogRef: MatDialogRef<PatientEntity>,
        private _formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private route: Router,
        private store: Store
    ) {
        this.isShortcut = data.dynamicComponentData !== null ? data.dynamicComponentData.search : false;
    }

    ngOnInit(): void {
        // Create the form
        this.searchForm = this._formBuilder.group({
            id: [],
            firstName: [''],
            lastName: [''],
            dob: [],
            city: [''],
            zip: [''],
            phone: [''],
            cell: [''],
            email: [''],
        });
    }

    /**
     * Save the document
     */
    searchPatient(): void {
        if (this.searchForm.invalid) {
            return;
        }
        if (this.auxUtilService.objFilled(this.searchForm.value)) {
            let patientSearch = this.searchForm.value;
            // Transform inputs
            patientSearch = this.auxUtilService.transFormValues(patientSearch, TranFormSerarchInputValues);

            if (this.searchForm.get('dob').value) {
                patientSearch = this.auxUtilService.formatDateFields(patientSearch, ['dob']);
            }

            //console.log(patientSearch);
            if (this.isShortcut) {
                this.route.navigate(['centers/patient-center/none'], {
                    queryParams: {
                        search: 'patient_search',
                    },
                    queryParamsHandling: 'merge',
                });
                this.store.dispatch(PatientCenterTableActions.isShortCut({ shortCut: this.isShortcut }));
            }
            this.store.dispatch(PatientCenterTableActions.PatientSearch({ patientSearch: patientSearch }));
            this.matDialogRef.close();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter search criteria',
            });
            return;
        }
    }

    closeDocument(): void {
        this.matDialogRef.close();
        this.route.navigate([], {
            queryParams: {
                search: null,
            },
            queryParamsHandling: 'merge',
        });
    }

    onDateChange(event, formControlName) {
        this.searchForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.searchForm,
            formControlName
        );
    }
}
