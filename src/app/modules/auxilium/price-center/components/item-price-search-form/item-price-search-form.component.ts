import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormSearchInputValues } from 'app/shared/components/auxilium/item-search.enum';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import Swal from 'sweetalert2';
import { PriceCenterTableActions } from '../../actions/price-center-table.actions';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-item-price-search-form',
    templateUrl: './item-price-search-form.component.html',
    styleUrls: ['./item-price-search-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
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
    ],
})
export class ItemPriceSearchFormComponent {
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
        this.isShortcut = data !== null ? data.search : false;
    }

    ngOnInit(): void {
        // Create the form
        this.searchForm = this._formBuilder.group({
            itemcode: [''],
            alternatecode: [''],
            description: [''],
            type: [''],
            itemcategory: [''],
            hcpcscode: [''],
            manufacturerpartno: [''],
        });
    }

    /**
     * Save the document
     */
    searchItem(): void {
        if (this.searchForm.invalid) {
            return;
        }
        if (this.auxUtilService.objFilled(this.searchForm.value)) {
            let itemSearch = this.searchForm.value;
            // Transform inputs
            itemSearch = this.auxUtilService.transFormValues(itemSearch, TranFormSearchInputValues);
            //console.log(patientSearch);
            if (this.isShortcut) {
                this.route.navigate(['centers/price-center/none'], {
                    queryParams: {
                        search: 'item_search',
                    },
                    queryParamsHandling: 'merge',
                });
            }
            this.store.dispatch(PriceCenterTableActions.ItemSearch({ itemSearch: itemSearch }));
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
