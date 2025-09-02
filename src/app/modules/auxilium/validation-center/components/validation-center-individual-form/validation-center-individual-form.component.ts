import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormInputValues } from 'app/shared/components/auxilium/patient-demographics.enum';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { Validation } from 'app/shared/interfaces/auxilium/validation-center/validation.interface';
import { Subscription } from 'rxjs';
import { ValidationCenterIndividualActions } from '../../actions/validation-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-validation-center-individual-form',
    templateUrl: './validation-center-individual-form.component.html',
    styleUrls: ['./validation-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatCheckbox,
        FuseAlertComponent,
    ],
})
export class ValidationCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: PhysicianDisplay;
    @Input() showDeleteButton: boolean = false;
    @Input() formType: string;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    data: PhysicianDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    subscription: Subscription;
    pecosOptions = [
        {
            option: '',
            value: '',
        },
        {
            option: 'Yes',
            value: 'Y',
        },
        {
            option: 'No',
            value: 'N',
        },
    ];

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) taxAutocomplete: MatAutocompleteTrigger;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<ValidationCenterIndividualFormComponent>
    ) {}

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            entity: [''],
            title: [''],
            failcode: [''],
            failmessage: [''],
            isActive: [true],
            bypassforpayors: [''],
            executeforpayors: [''],
            notes: [''],
            adduserid: [''],
            adddate: [''],
            columns: [''],
            severity: [''],
            validateformode: [''],
            billformstoskip: [''],
        });
    }

    ngAfterViewInit() {
        this._subscribeToClosingActions();
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    private _subscribeToClosingActions(): void {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
        if (this.stateAutocomplete) {
            this.subscription = this.stateAutocomplete.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
                if (!e || !e.source) {
                    this.contactForm.get('state').setValue(null);
                }
            });
        }
        if (this.taxAutocomplete) {
            this.subscription = this.taxAutocomplete.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
                if (!e || !e.source) {
                    this.contactForm.get('taxonomy').setValue(null);
                }
            });
        }
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        this.cancel.emit(editMode);
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let validation: Validation = this.contactForm.value;
        // Transform inputs to uppercase

        // Set default date when adding a new record
        if (validation.id == 0) {
            validation.adddate = new Date().toISOString();
        }

        validation = this.auxUtilService.transFormValuesToUpperCase(validation, [
            'title',
            'failcode',
            'failmessage',
            'bypassforpayors',
            'executeforpayors',
            'billformstoskip',
        ]);

        validation = this.auxUtilService.transFormValues(validation, TranFormInputValues);
        // Update the contact on the server
        this.store.dispatch(ValidationCenterIndividualActions.AddValidationRep({ validation }));
        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }
    trackByFn(item: any) {
        return item.abbreviation;
    }
}
