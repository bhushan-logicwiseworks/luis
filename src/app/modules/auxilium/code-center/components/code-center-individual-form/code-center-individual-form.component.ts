import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { CodeDisplay } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { CodeCenterIndividualActions } from '../../actions/code-center-individual.actions';

@UntilDestroy()
@Component({
    selector: 'ac-code-center-individual-form',
    templateUrl: './code-center-individual-form.component.html',
    styleUrls: ['./code-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepickerInput,
        MatDatepicker,
        MatError,
        FuseAlertComponent,
    ],
})
export class CodeCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    codeDisplayData: CodeDisplay;
    @Input() showDeleteButton: boolean = false;

    state = new FormControl();
    dateFormat: string = constVariables.DATE_FORMAT;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<CodeCenterIndividualFormComponent>
    ) {
        this.codeDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            code: ['', [Validators.required]],
            codetype: ['', [Validators.required]],
            description: [''],
            adduserid: [''],
            adddate: [''],
            syslock: [true],
            effectivedate: [''],
            expiredate: [''],
            path: [''],
            action: [''],
            notes: [''],
            miscflag1: [true],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.codeDisplayData);
    }

    ngAfterViewInit() {}

    ngOnDestroy() {}

    /**
     * Save the contact
     */
    saveContact(): void {
        if (this.contactForm.invalid) {
            return;
        }

        // Populate the object from the screen
        let code: CodeDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(code)) {
            return;
        }

        // Set default date when adding a new record
        if (code.id == 0) {
            code.adddate = new Date() as unknown as string;
            code.effectivedate = new Date(1900, 0, 1);
            code.expiredate = new Date(1900, 0, 1);
        }

        // Transform inputs to uppercase
        code = this.auxUtilService.transFormValuesToUpperCase(code, [
            'code',
            'codetype',
            'description',
            'path',
            'action',
            'notes',
        ]);
        code = this.auxUtilService.cleanData(code);

        // Update the contact on the server
        this.store.dispatch(CodeCenterIndividualActions.AddCode({ code: code }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: CodeDisplay): boolean {
        // Make sure CODE was entered. This is the only required field.
        if (contact.code == '' || contact.code == null) {
            this.alert = {
                type: 'error',
                message: 'Code cannot be blank.',
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
