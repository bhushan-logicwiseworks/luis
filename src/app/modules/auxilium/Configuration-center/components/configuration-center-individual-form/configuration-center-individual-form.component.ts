import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { ConfigurationDisplay } from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';
import { ConfigurationCenterIndividualActions } from '../../action/configuration-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'app-configuration-center-individual-form',
    templateUrl: './configuration-center-individual-form.component.html',
    styleUrls: ['./configuration-center-individual-form.component.scss'],
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
export class ConfigurationCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    configuration: ConfigurationDisplay;
    @Input() showDeleteButton: boolean = false;
    state = new FormControl();
    dateFormat: string = constVariables.DATE_FORMAT;
    data: ConfigurationDisplay;
    configurationForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private configurationDisplay: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<ConfigurationCenterIndividualFormComponent>
    ) {
        this.configuration = configurationDisplay.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.configurationForm = this._formBuilder.group({
            id: [0],
            group: ['', [Validators.required]],
            setting: ['', [Validators.required]],
            value: [''],
            notes: [''],
            adduserid: [''],
            adddate: [''],
        });

        // Patch values to the form
        this.configurationForm.patchValue(this.configuration);
    }

    ngAfterViewInit() {}

    ngOnDestroy() {}

    /**
     * Save the contact
     */
    saveContact(): void {
        if (this.configurationForm.invalid) {
            return;
        }

        // Populate the object from the screen
        let configuration: ConfigurationDisplay = this.configurationForm.value;

        // Validate input
        if (!this.isInputValid(configuration)) {
            return;
        }

        // Set default date when adding a new record
        if (configuration.id == 0) {
            configuration.adddate = new Date().toISOString();
            const originalDate = new Date(configuration.adddate);
            configuration.adddate = originalDate.toISOString();
            // configuration.adddate = new Date() as unknown as string;
        }

        // Transform inputs to uppercase
        configuration = this.auxUtilService.transFormValuesToUpperCase(configuration, [
            'group',
            'setting',
            'value',
            'notes',
            'adduserid',
            'adddate',
        ]);
        configuration = this.auxUtilService.cleanData(configuration);

        // Update the contact on the server
        this.store.dispatch(ConfigurationCenterIndividualActions.AddConfiguration({ configuration }));
        this.dialogRef.close();
    }

    isInputValid(configuration: ConfigurationDisplay): boolean {
        // Make sure CODE was entered. This is the only required field.
        if (configuration.group == '' || configuration.group == null) {
            this.alert = {
                type: 'error',
                message: 'Group cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }

    onDateChange(event, formControlName) {
        this.configurationForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.configurationForm,
            formControlName
        );
    }
}
