import {
    AfterViewInit,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { BillTypeDisplay } from 'app/shared/interfaces/auxilium/billType-center/billType.interface';
import { Subscription } from 'rxjs';
import { BillTypesCenterIndividualActions } from '../../actions/billtype-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-billType-center-individual-form',
    templateUrl: './billType-center-individual-form.component.html',
    styleUrls: ['./billType-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        FuseAlertComponent,
    ],
})
export class BillTypeCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    BillTypeDisplayData: BillTypeDisplay;
    @Input() showDeleteButton: boolean = false;

    state = new FormControl();
    contactForm: UntypedFormGroup;
    alert: any;
    showAlert: boolean = false;
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<BillTypeCenterIndividualFormComponent>
    ) {
        this.BillTypeDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            billtype: [''],
            title: [''],
            shipcount: [''],
            skipcount: [''],
            description: [''],
            period: [''],
            adddate: [''],
            adduserid: [''],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.BillTypeDisplayData);
    }

    ngAfterViewInit() {}
    ngOnDestroy() {}

    trackByFn(item: any) {
        return item.abbreviation;
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let billType: BillTypeDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(billType)) {
            return;
        }

        // Set default date when adding a new record
        if (billType.id == 0) {
            billType.adddate = new Date();
        }

        // Transform inputs to uppercase
        billType = this.auxUtilService.transFormValuesToUpperCase(billType, [
            'billtype',
            'title',
            'shipcount',
            'skipcount',
            'description',
            'period',
        ]);
        // Update the contact on the server
        this.store.dispatch(BillTypesCenterIndividualActions.AddBillType({ billType }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: BillTypeDisplay): boolean {
        // Make sure billType was entered. This is the only required field.
        if (contact.billtype == '' || contact.billtype == null) {
            this.alert = {
                type: 'error',
                message: 'Billtype Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
