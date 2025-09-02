import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormSerarchInputValues } from 'app/shared/components/auxilium/patient-search.enum';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import Swal from 'sweetalert2';
import { ProofOfDeliveryTableActions } from '../../actions/proof-of-delivery-table.actions';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'app-proof-of-delivery-search',
    templateUrl: './proof-of-delivery-search.component.html',
    styleUrls: ['./proof-of-delivery-search.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
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
    ],
})
export class ProofOfDeliverySearchComponent {
    searchForm: FormGroup;

    dateFormat: string = constVariables.DATE_FORMAT;
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<EmployeeDisplay>,
        private _formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.searchForm = this._formBuilder.group({
            patientId: [],
            invoiceNo: [''],
            shipDate: [''],
            trackingNumber: [],
        });
    }

    searchShipment(): void {
        if (this.searchForm.invalid) {
            return;
        }
        if (this.auxUtilService.objFilled(this.searchForm.value)) {
            let ShipSearch = this.searchForm.value;

            // Transform inputs
            ShipSearch = this.auxUtilService.transFormValues(ShipSearch, TranFormSerarchInputValues);

            if (ShipSearch.shipDate) {
                ShipSearch.shipDate = this.auxUtilService.formatDate(ShipSearch.shipDate);
            } else {
                ShipSearch.shipDate = null; // Handle null or undefined if required
            }

            this.store.dispatch(ProofOfDeliveryTableActions.ProofOfDeliverySearch({ searchPOd: ShipSearch }));
            this.matDialogRef.close();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter search criteria',
            });
        }
    }

    closeDocument(): void {
        this.matDialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.searchForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.searchForm,
            formControlName
        );
    }
}
