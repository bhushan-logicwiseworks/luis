import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ReferralQuickSave } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { ReferralCenterTableActions } from '../../actions/referral-center-table.actions';
import { ReferralCenterTableSelectors } from '../../reducers';
import { ReferralCenterIndividualFormComponent } from '../referral-center-individual-form/referral-center-individual-form.component';
import { MatFormField, MatLabel, MatPrefix, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgIf, NgFor } from '@angular/common';
import { MatSelect, MatOption } from '@angular/material/select';

@UntilDestroy()
@Component({
    selector: 'app-referral-quick-save',
    templateUrl: './referral-quick-save.component.html',
    styleUrls: ['./referral-quick-save.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        NgIf,
        MatError,
        MatSelect,
        NgFor,
        MatOption,
    ],
})
export class ReferralQuickSaveComponent implements OnInit {
    contactForm: UntypedFormGroup;
    alert: any;
    salesRepList: any;
    data$ = this.store.select(ReferralCenterTableSelectors.selectActive);
    constructor(
        private dialogRef: MatDialogRef<ReferralCenterIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Create the Referral form
        this.contactForm = this._formBuilder.group({
            id: [0],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            salesId: ['', [Validators.required]],
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.salesRepList = data;
        });
    }
    /**
     * Save the contact
     */
    saveQuickReferral(): void {
        // Populate the object from the screen
        const referral: ReferralQuickSave = this.contactForm.value;
        if (!this.isInputValid(referral)) {
            return;
        }
        // Transform inputs to uppercase
        referral.firstname = referral.firstname.toUpperCase();
        referral.lastname = referral.lastname.toUpperCase();
        this.store.dispatch(ReferralCenterTableActions.AddReferralQuickSave({ referral: referral }));
        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: ReferralQuickSave): boolean {
        if (contact.firstname == '') {
            return false;
        } else if (contact.lastname == '') {
            return false;
        } else if (contact.salesId == null || contact.salesId == undefined || contact.salesId == 0) {
            return false;
        }
        return true;
    }
}
