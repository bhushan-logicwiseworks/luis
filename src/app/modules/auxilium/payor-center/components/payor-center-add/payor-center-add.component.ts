import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatError, MatPrefix } from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-payor-center-add',
    templateUrl: './payor-center-add.component.html',
    styleUrls: ['./payor-center-add.component.scss'],
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
        MatError,
        MatIcon,
        MatPrefix,
    ],
})
export class PayorCenterAddComponent {
    payorAddEditForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        public matDialogRef: MatDialogRef<any>
    ) {
        this.payorAddEditForm = this.fb.group({
            id: [0],
            billTo: ['', [Validators.required]],
            name: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    trackByFn(item) {
        return item.abbreviation;
    }

    save() {
        if (this.payorAddEditForm.invalid) {
            return;
        }

        let payor = this.payorAddEditForm.value;

        payor = this.auxUtilService.transFormValuesToUpperCase(payor, ['name', 'billTo']);

        payor = this.auxUtilService.cleanData(payor);

        // Save changes
        this.store.dispatch(PayorCenterTableActions.AddPayorQuickSave({ payor }));

        this.matDialogRef.close();
    }
}
