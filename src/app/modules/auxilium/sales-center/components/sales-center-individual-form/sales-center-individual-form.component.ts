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
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { combineLatest, debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { SalesCenterIndividualActions } from '../../actions/sales-center-individual.actions';
import { SalesCenterTableActions } from '../../actions/sales-center-table.actions';
import { SalesCenterIndividualSelectors, SalesCenterTableSelectors } from '../../reducers';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-sales-center-individual-form',
    templateUrl: './sales-center-individual-form.component.html',
    styleUrls: ['./sales-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        NgxMaskDirective,
        NgFor,
        MatCheckbox,
        FuseAlertComponent,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class SalesCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: SalesRepDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    branchName = new FormControl();
    data: SalesRepDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    usstates = states;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    stateMapping = stateMapping;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;
    subscription: Subscription;
    territory = new FormControl();
    categories = Categories;
    filteredCategories: Observable<any>;
    salesCityState$ = this.store.select(SalesCenterTableSelectors.selectSalesCityState);
    branch$ = this.store.select(SalesCenterIndividualSelectors.selectBranch);

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<SalesCenterIndividualFormComponent>
    ) {
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            cell: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            territory: [''],
            authrep: [''],
            isActive: [true],
            addDate: [''],
            addUserId: [''],
            branchid: [0],
        });

        // Filter state
        this.filteredOptions = this.contactForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );

        this.salesCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.contactForm.get('state').setValue(result.state);
                this.contactForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.contactForm.get('state').setValue('');
                this.contactForm.get('city').setValue('');
            }
        });

        if (this.contact) {
            this.contactForm.get('salesCode').patchValue(this.contact['salescode']);
            this.contactForm.get('addDate').patchValue(this.contact['adddate']);
            this.contactForm.get('addUserId').patchValue(this.contact['adduserid']);
            this.contactForm.get('branchid').setValue(this.contact['branchid'].toString());
            this.contactForm.get('isActive').setValue(this.contact['isactive']);
            this.state.setValue(this.contact.state);
            this.contactForm.patchValue(this.contact, { emitEvent: false });
        }

        this.filteredCategories = this.contactForm.get('territory').valueChanges.pipe(
            startWith(''),
            map(val => this.CategoryFilter(val))
        );

        // Patch values to the form
        this.contactForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(SalesCenterTableActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });

        combineLatest([
            this.branch$,
            this.contactForm.get('branchid').valueChanges.pipe(startWith(this.contactForm.get('branchid').value)),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([branches, branchid]) => {
                if (branches && branchid) {
                    const selectedBranch = branches.find(branch => branch.id === branchid);
                    if (selectedBranch) {
                        if (this.contactForm.get('branchid').value !== selectedBranch.id) {
                            this.onBranchSelected(selectedBranch);
                        }
                    }
                }
            });
    }

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
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

    trackByFn(item: any) {
        return item.abbreviation;
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        if (this.contactForm.invalid) {
            return;
        }

        // Populate the object from the screen
        let salesrep: SalesRepDisplay = this.contactForm.value;

        // Set default date when adding a new record
        if (salesrep.id == 0) {
            salesrep.addDate = new Date();
        }

        // Transform inputs to uppercase
        salesrep = this.auxUtilService.transFormValuesToUpperCase(salesrep, [
            'firstname',
            'lastname',
            'address',
            'address2',
            'city',
            'state',
            'email',
            'territory',
        ]);
        // Update the contact on the server
        this.store.dispatch(SalesCenterIndividualActions.AddSalesRep({ salesrep }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    categoryhandler(event: MatAutocompleteSelectedEvent): void {
        this.territory.setValue(event.option.value);
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.contactForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
