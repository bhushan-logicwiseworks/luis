import { AsyncPipe } from '@angular/common';
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
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PhysicianCenterTableActions } from 'app/modules/auxilium/physician-center/actions/physician-center-table.actions';
import { PhysicianCenterTableSelectors } from 'app/modules/auxilium/physician-center/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { BranchRepDisplay } from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { BranchCenterIndividualActions } from '../../actions/branch-center-individual.actions';
import { BranchCenterIndividualSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-branch-center-individual-form',
    templateUrl: './branch-center-individual-form.component.html',
    styleUrls: ['./branch-center-individual-form.component.scss'],
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
        MatAutocomplete,
        MatOption,
        NgxMaskDirective,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class BranchCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    branchRepDisplayData: BranchRepDisplay;
    @Input() showDeleteButton: boolean = false;

    state = new FormControl();
    branchForm: UntypedFormGroup;
    alert: any;
    taxonomyList: any;
    taxonomy = new FormControl();
    usstates = states;
    stateMapping = stateMapping;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;
    filteredTaxonomy: Observable<any>;
    data$ = this.store.select(PhysicianCenterTableSelectors.selecttaxonomy);
    patientCityState$ = this.store.select(BranchCenterIndividualSelectors.selectPatientCityState);
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) taxAutocomplete: MatAutocompleteTrigger;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<BranchCenterIndividualFormComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private branchRepDisplay: any
    ) {
        this.store.dispatch(PhysicianCenterTableActions.LoadTaxonomy());
        this.branchRepDisplayData = branchRepDisplay.dynamicComponentData;
    }

    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.taxonomyList = data;
            }
        });
        // Create the contact form
        this.branchForm = this._formBuilder.group({
            id: [0],
            branchcode: ['', [Validators.required]],
            name: ['', [Validators.required]],
            address: [''],
            city: [''],
            state: [''],
            zip: [''],
            pin: [''],
            medicaid: [''],
            otherpin: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            tax: [0],
            taxcounty: [0],
            taxlocal: [0],
            fedid: [''],
            email: [''],
            npi: [''],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            notes: [''],
            contact1: [''],
            title1: [''],
            contact2: [''],
            title2: [''],
            taxonomy: [''],
            adduserid: [''],
            adddate: [''],
        });

        // Filter state
        this.filteredOptions = this.branchForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        // Filter Taxonomy
        this.filteredTaxonomy = this.branchForm.get('taxonomy').valueChanges.pipe(
            startWith(''),
            map(val => this.filterTaxonomy(val))
        );

        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.branchForm.get('state').setValue(result.state);
                this.branchForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.branchForm.get('state').setValue('');
                this.branchForm.get('city').setValue('');
            }
        });

        if (this.branchRepDisplayData && this.branchRepDisplayData.state != null) {
            this.state.setValue(this.branchRepDisplayData.state);
        } else {
            this.state.setValue('');
            this.branchForm.get('state').setValue('');
            this.branchForm.get('city').setValue('');
        }
        // Patch values to the form
        this.branchForm.patchValue(this.branchRepDisplayData);
        this.state.setValue(this.branchRepDisplayData?.state);
        const selectedOption = `${this.branchRepDisplayData?.state}`;
        const abbreviation = this.stateMapping[selectedOption];
        this.branchForm.patchValue({
            state: abbreviation, // Send the abbreviation to the backend
        });

        this.branchForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(BranchCenterIndividualActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }
    filter(val: string) {
        return this.usstates.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }
    filterTaxonomy(val: string) {
        return this.taxonomyList.filter((option: any) => option.code.toLowerCase().indexOf(val?.toLowerCase()) === 0);
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
        this.subscription = this.stateAutocomplete.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
            if (!e || !e.source) {
                this.branchForm.get('state').setValue(null);
            }
        });
        this.subscription = this.taxAutocomplete.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
            if (!e || !e.source) {
                this.branchForm.get('taxonomy').setValue(null);
            }
        });
    }
    statehandler(event: MatAutocompleteSelectedEvent): void {
        this.state.setValue(event.option.value);
    }
    taxhandler(event: MatAutocompleteSelectedEvent): void {
        this.taxonomy.setValue(event.option.value);
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let branch: BranchRepDisplay = this.branchForm.value;
        if (branch.state != null) {
            let state = this.usstates.filter(item => item.name == branch.state);
            branch.state = state[0]?.abbreviation;
        }

        // Validate input
        // if (!this.isInputValid(branchrep)) {
        //     return;
        // }

        // Set default date when adding a new record
        if (branch.id == 0) {
            branch.adddate = new Date() as unknown as string;
        }

        // Transform inputs to uppercase
        // console.log(branchrep);
        branch = this.auxUtilService.transFormValuesToUpperCase(branch, [
            'branchcode',
            'name',
            'city',
            'state',
            'email',
            'notes',
        ]);
        branch = this.auxUtilService.cleanData(branch);
        branch.state = this.state.value;
        // Update the contact on the server
        this.store.dispatch(BranchCenterIndividualActions.AddBranch({ branch }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: BranchRepDisplay): boolean {
        // Make sure BRANCH CODE was entered. This is the only required field.
        if (contact.branchcode == '' || contact.branchcode == null) {
            this.alert = {
                type: 'error',
                message: 'BRANCH Code cannot be blank.',
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

    makeCall(): void {
        const phoneNumber = this.branchForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
