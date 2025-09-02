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
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCheckbox } from '@angular/material/checkbox';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';
@UntilDestroy()
@Component({
    selector: 'ac-work-order-center-individual-form',
    templateUrl: './work-order-center-individual-form.component.html',
    styleUrls: ['./work-order-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        MatDialogTitle,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatDialogClose,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatPrefix,
        MatInput,
        NgSelectComponent,
        NgxMaskDirective,
        MatCheckbox,
        FuseAlertComponent,
        MatButton,
        AuxPhonePipe,
    ],
})
export class WorkOrderCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: SalesRepDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    data: SalesRepDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    usstates = states;
    stateMapping = stateMapping;
    showAlert: boolean = false;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            salesCode: [''],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            cell: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            branchId: [0],
            territory: [''],
            authrep: [''],
            isActive: [true],
            adddate: [''],
            addUserId: [''],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.contact);

        // Get state abbreviation
        const selectedOption = `${this.contact?.state}`;
        const abbreviation = this.stateMapping[selectedOption];
        this.contactForm.patchValue({
            state: abbreviation, // Send the abbreviation to the backend
        });
    }

    filter(val: string) {
        return this.usstates.filter(option => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
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

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        // let workrep: WorkOrderDisplay = this.contactForm.value;
        // Get the state abbreviation
        // let state = this.usstates.filter(item => item.name == workrep.state);
        // workrep.state = state[0]?.abbreviation;
        // Validate input
        // if (!this.isInputValid(workrep)) {
        //     return;
        // }
        // Set default date when adding a new record
        // if (workrep.id == 0) {
        //     workrep.adddate = new Date();
        // }
        // Transform inputs to uppercase
        // workrep.salesCode = workrep.salesCode ? workrep.salesCode.toUpperCase() : '';
        // workrep.firstName = workrep.firstName ? workrep.firstName.toUpperCase() : '';
        // workrep.lastName = workrep.lastName ? workrep.lastName.toUpperCase() : '';
        // workrep.address = workrep.address ? workrep.address.toUpperCase() : '';
        // workrep.address = workrep.address ? workrep.address.toUpperCase() : '';
        // workrep.address2 = workrep.address2 ? workrep.address2.toUpperCase() : '';
        // workrep.city = workrep.city ? workrep.city.toUpperCase() : '';
        // workrep.state = workrep.state ? workrep.state.toUpperCase() : '';
        // workrep.email = workrep.email ? workrep.email.toUpperCase() : '';
        // workrep.territory = workrep.territory ? workrep.territory.toUpperCase() : '';
        // console.log(workrep);
        // Update the contact on the server
        // this.store.dispatch(WorkOrderCenterIndividualActions.AddworkRep({ workrep }));
        // trigger save event
        // this.save.emit();
    }

    isInputValid(contact: SalesRepDisplay): boolean {
        // Make sure SALES CODE was entered. This is the only required field.
        if (contact.salesCode == '' || contact.salesCode == null) {
            this.alert = {
                type: 'error',
                message: 'Sales Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }
}
