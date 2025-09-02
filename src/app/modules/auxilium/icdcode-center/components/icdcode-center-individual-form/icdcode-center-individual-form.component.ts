import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { IcdCodesCenterIndividualActions } from '../../actions/icdcode-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-icdcode-center-individual-form',
    templateUrl: './icdcode-center-individual-form.component.html',
    styleUrls: ['./icdcode-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        FuseAlertComponent,
    ],
})
export class IcdCodeCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: ICDCodeDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    data: ICDCodeDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    dateFormat: string = constVariables.DATE_FORMAT;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<IcdCodeCenterIndividualFormComponent>
    ) {}

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            icd9code: [''],
            status: [''],
            description: [''],
            changeindicator: [''],
            codestatus: [''],
            shortdescription: [''],
            mediumdescription: [''],
            longdescription: [''],
            icd10code: [''],
            icd10description: [''],
            flags: [''],
            inactivedate: [''],
            adddate: [''],
            adduserid: [''],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.contact);
    }

    ngAfterViewInit() {}
    ngOnDestroy() {}

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        this.cancel.emit(editMode);
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let icdcode: ICDCodeDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(icdcode)) {
            return;
        }

        // Set default date when adding a new record
        if (icdcode.id == 0) {
            icdcode.adddate = new Date();
        }

        // Transform inputs to uppercase
        icdcode = this.auxUtilService.transFormValuesToUpperCase(icdcode, [
            'icd9code',
            'status',
            'description',
            'changeindicator',
            'codestatus',
            'shortdescription',
            'mediumdescription',
            'longdescription',
            'icd10code',
            'icd10description',
            'flags',
        ]);

        // Update the contact on the server
        this.store.dispatch(IcdCodesCenterIndividualActions.AddIcdCode({ icdcode }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(contact: ICDCodeDisplay): boolean {
        // Make sure icd9code was entered. This is the only required field.
        if (contact.icd9code == '' || contact.icd9code == null) {
            this.alert = {
                type: 'error',
                message: 'icd9code Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
    onDateChange(event, formControlName) {
        this.contactForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.contactForm,
            formControlName
        );
    }
}
