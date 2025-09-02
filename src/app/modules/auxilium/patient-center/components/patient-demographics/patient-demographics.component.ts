import { AsyncPipe, formatDate, NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { ApiService } from 'app/core/services/api.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { AuxReferralFromComponent } from 'app/shared/components/auxilium/aux-referral-from/aux-referral-from.component';
import { AuxSelectDropdownOption } from 'app/shared/components/auxilium/aux-select-dropdown/aux-select-dropdown-option.interface';
import { Categories } from 'app/shared/components/auxilium/categories';
import { BestTime, DropDownOptions, Language } from 'app/shared/components/auxilium/contactInfo';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { combineLatest, debounceTime, map, Observable, startWith, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/patient-checklists.enum';
import {
    TranFormInputValuesUpperCase,
    TransFormDateValues,
} from '../../../../../shared/components/auxilium/patient-demographics.enum';
import { DefaultDate } from '../../../../../shared/directives/auxilium/aux-default-date.directive';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PatientDemographicsActions } from '../../actions/patient-demographics.action';
import { PatientCenterDeatilsActions } from '../../actions/patient-details.action';
import { PatientCenterDetailsSelectors, PatientDemographicsSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { PatientBalancesComponent } from '../patient-balances/patient-balances.component';
import { PatientContactNotesDrawerComponent } from '../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-demographics',
    templateUrl: './patient-demographics.component.html',
    styleUrls: ['./patient-demographics.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
        provideNativeDateAdapter(),
        DateFormatPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        FuseAlertComponent,
        MatIcon,
        MatFormField,
        MatLabel,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        AuxSelectDropdownComponent,
        NgClass,
        MatDatepickerInput,
        DefaultDate,
        MatDatepickerToggle,
        MatDatepicker,
        MatError,
        MatCheckbox,
        NgxMaskDirective,
        MatSelect,
        MatSelectTrigger,
        NgFor,
        MatTooltip,
        MatPrefix,
        AsyncPipe,
    ],
})
export class PatientDemographicsComponent implements OnInit {
    toolbarData: FuseNavigationItem[];
    dropDownOption = DropDownOptions;
    patientForm: FormGroup;
    branchName = new FormControl();
    title: string;
    state = new FormControl();
    patientcategory = new FormControl();
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    salesrepList: AuxSelectDropdownOption[];
    usstates = states;
    language = Language;
    branch$ = this.store.select(PatientDemographicsSelectors.selectBranch);

    contactMethod$ = this.store.select(PatientCenterDetailsSelectors.selectPatientContactMethod).pipe(
        map(data =>
            data.map(result => ({
                name: result.description,
                value: result.code,
            }))
        )
    );
    bestTime = BestTime;
    stateMapping = stateMapping;
    patient: Patient;
    categories = Categories;
    patient$ = this.store.select(PatientCenterDetailsSelectors.selectPatientDetails);
    demographics$ = this.store.select(PatientDemographicsSelectors.selectdemographics);
    salesrep$ = this.store.select(PatientCenterDetailsSelectors.selectPatientSalesrep);
    referCode$ = this.store.select(PatientDemographicsSelectors.selectReferCode);
    dateFormat: string = constVariables.DATE_FORMAT;
    showContactNote: boolean = false;
    disableReferCode: boolean = false;
    referralData: { company?: string; firstName?: string; lastName?: string } = {};

    manufacturerList = [
        {
            name: 'ABBOTT',
            value: 'ABBOTT',
        },
        {
            name: 'DEXCOM',
            value: 'DEXCOM',
        },
    ];

    // Intake Dropdown (pcpid)
    intake$ = this.store.select(PatientCenterDetailsSelectors.selectPatientIntake).pipe(
        map(data =>
            data.map(result => ({
                name: result.firstName + ' ' + result.lastName,
                value: result.id,
            }))
        )
    );

    // Patient Category Drop Down
    patientCategoryList$ = this.store.select(PatientCenterDetailsSelectors.selectPatientCategory).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    // Patient Status drop down
    patientStatusList$ = this.store.select(PatientCenterDetailsSelectors.selectPatientStatus).pipe(
        map(data =>
            data.map(result => ({
                name: result.description,
                value: result.code,
            }))
        )
    );

    // Inactive Reason drop down
    inactiveReasonList$ = this.store.select(PatientCenterDetailsSelectors.selectInactiveReason);

    // Patient Referral Drop down
    patientReferralList$ = this.store.select(PatientCenterDetailsSelectors.selectPatientReferral).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    loading$ = this.store.select(PatientCenterDetailsSelectors.selectLoading);
    alert: any;
    refresh = new Subject();
    inactiveReasonList;
    refresh$ = this.refresh.asObservable();
    subscription: Subscription;

    patientCityState$ = this.store.select(PatientCenterDetailsSelectors.selectPatientCityState);

    @ViewChild(MatAutocompleteTrigger)
    stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger })
    categoryAutocomplete: MatAutocompleteTrigger;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private router: Router,
        private actions$: Actions,
        private auxUtilService: AuxUtilService,
        private titleService: TitleService,
        private matDialog: MatDialog,
        private ApiService: ApiService
    ) {
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
            {
                title: 'View Contact Notes',
                type: 'basic',
                icon: 'mat_outline:speaker_notes',
                function: () => {
                    this.viewPatientNotes();
                },
            },
            {
                title: 'View Payors',
                type: 'basic',
                icon: 'mat_outline:money',
                function: () => {
                    this.viewPayors();
                },
            },
            {
                title: 'View Owed',
                type: 'basic',
                icon: 'mat_outline:mode_comment',
                function: () => {
                    this.viewOwned();
                },
            },
        ];

        this.branch$.pipe(untilDestroyed(this)).subscribe(res => {
            if (res && !res.length) {
                this.store.dispatch(PatientDemographicsActions.LoadBranchDropDown());
            }
        });
    }

    ngOnInit(): void {
        this.patientForm = this.fb.group({
            id: [0],
            firstName: [''],
            mi: [''],
            lastName: [''],
            suffix: [''],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            county: [''],
            sex: [''],
            dob: [''],
            inactiveReason: [''],
            inactiveDate: [''],
            rating: [0],
            adduserid: [''],
            entryDate: [''],
            phone: [''],
            cellphone: [''],
            email: [''],
            language: [''],
            besttime: [''],
            contactmethod: [''],
            patientcategory: [''],
            patientstatus: [''],
            contactNote: [''],
            branchId: [''],
            sendemail: [''],
            sendtext: [''],
            sendmail: [''],
            call: [''],
            delete: [''],
            salesid: [{ value: '', disabled: true }],
            fieldservicerepid: [{ value: '', disabled: true }],
            referId: [''],
            referCode: [''],
            pcpid: [''], // intake
            medicarepatient: [''],
            pwocompleted: [''],
            qualifiedcgm: [''],
            chartnotes: [''],
            contactattempt1: [''],
            contactattempt2: [''],
            contactattempt3: [''],
            patientinterview: [''],
            insuranceverified: [''],
            completedpworeceived: [''],
            qualifyingnotesreceived: [''],
            dispositionholdnote: [''],
            inventorylocation: [''],
            datesent: [''],
            terms: [''],
            deductibleamount: [0],
        });

        this.filteredStates = this.patientForm.get('state').valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );

        this.patientForm
            .get('patientstatus')
            .valueChanges.pipe(untilDestroyed(this))
            .subscribe(val => {
                if (val) {
                    if (val === 'I' || val === 'M' || val === 'C' || val === 'S') {
                        this.patientForm.controls['inactiveReason'].enable();
                        this.patientForm.controls['inactiveDate'].enable();
                    } else {
                        this.patientForm.controls['inactiveReason'].disable();
                        this.patientForm.controls['inactiveDate'].disable();
                    }
                    if (val === 'I' || val === 'M' || val === 'C' || val === 'S') {
                        this.showContactNote = true;
                    } else {
                        this.showContactNote = false;
                    }
                }
            });

        this.inactiveReasonList$.pipe(untilDestroyed(this)).subscribe(res => {
            this.inactiveReasonList = res;
        });

        // SalesRep Dropdown
        this.salesrep$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.salesrepList = data.map(result => {
                    return {
                        name: result.firstName + ' ' + result.lastName,
                        value: result.id,
                    };
                });
            }
        });
        const patientId = parseInt(window.location.href.split('/')[5], 10);
        this.store.dispatch(PatientCenterDeatilsActions.LoadPatientDetails({ id: patientId }));

        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.patientForm.get('state').setValue(result.state);
                this.patientForm.get('city').setValue(result.city);
            } else {
                this.patientForm.get('state').setValue('');
                this.patientForm.get('city').setValue('');
            }
        });

        this.actions$
            .pipe(ofType(PatientDemographicsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.patient$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.patient = data;
                const patientDetails: Record<string, any> = {
                    ...this.patient,
                };

                //console.log('luis', data);

                const entryDate = this.patient['entryDate'];
                const getEntryDate = new Date(entryDate);
                const now = new Date();
                const timeDifference = now.getTime() - getEntryDate.getTime();
                const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

                if (timeDifference > twentyFourHoursInMilliseconds) {
                    //this.disableReferCode = true;
                    //this.patientForm.controls['referCode'].disable();
                } else {
                    //this.disableReferCode = false;
                }
                if (this.patient['referid'] !== 0 && this.patient['referid']) {
                    const referId = this.patient['referid'];
                    this.patientForm.get('referId').setValue(referId);
                    this.store.dispatch(PatientDemographicsActions.getReferCode({ id: referId }));
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientReferrals());
                    this.referCode$
                        .pipe(
                            untilDestroyed(this),
                            filter(referCode => referCode !== null && referCode !== undefined && referCode !== '')
                        )
                        .subscribe(referCode => {
                            this.store
                                .select(
                                    PatientCenterDetailsSelectors.selectReferralById(
                                        (referCode as unknown as { desciption: string }).desciption
                                    )
                                )
                                .pipe(untilDestroyed(this))
                                .subscribe(refereralRecord => {
                                    if (refereralRecord) {
                                        this.referralData.company = refereralRecord['company'] || '';
                                        this.referralData.firstName = refereralRecord['firstName'] || '';
                                        this.referralData.lastName = refereralRecord['lastName'] || '';

                                        // Format the display as "ID - COMPANY" or "ID - FIRST NAME LAST NAME"
                                        const displayText = this.referralData.company
                                            ? `${this.patient['referid']} - ${this.referralData.company}`
                                            : `${this.patient['referid']} - ${this.referralData.firstName} ${this.referralData.lastName}`;
                                        this.patientForm.get('referCode').setValue(displayText);
                                    }
                                });
                        });
                } else {
                    this.patientForm.get('referCode').setValue('');
                }
                const status = patientDetails.patientstatus;
                this.showContactNote = status === 'I' || status === 'M' || status === 'C' || status === 'S';
                patientDetails.salesid = this.patient.salesid;
                patientDetails.sendtext = this.patient.sendtext === 'Y';
                patientDetails.call = this.patient.call === 'Y';
                //patientDetails.inventorylocation = Number(this.patient.inventorylocation)
                patientDetails.inventorylocation = this.patient.inventorylocation;
                patientDetails.branchId = this.patient.branchId.toString();
                patientDetails.patientcategory = this.patient.patientcategory;
                patientDetails.sendemail = this.patient.sendemail === 'Y';
                patientDetails.sendmail = this.patient.sendmail === 'Y';
                patientDetails.fieldservicerepid = this.patient.fieldservicerepid;
                patientDetails.phone = this.patient.phone;
                patientDetails.cellphone = this.patient.cellphone;
                patientDetails.inactiveReason = this.patient.phykey2;
                patientDetails.inactiveDate = this.patient.recalldate;
                // patientDetails.referCode = this.patient['referCode'];
                this.patientForm.patchValue(patientDetails, {
                    emitEvent: false,
                });
                this.patientForm.controls['adduserid'].disable();
                //console.log('patientstatus', patientDetails.patientstatus)
                if (
                    patientDetails.patientstatus === 'I' ||
                    patientDetails.patientstatus === 'M' ||
                    patientDetails.patientstatus === 'C' ||
                    patientDetails.patientstatus === 'S'
                ) {
                    //console.log('enable')
                    this.patientForm.controls['inactiveReason'].enable();
                    this.patientForm.controls['inactiveDate'].enable();
                } else {
                    //console.log('disable')
                    this.patientForm.controls['inactiveReason'].disable();
                    this.patientForm.controls['inactiveDate'].disable();
                }
                // Change format to M/d/yyyy h:mm a
                //const currentDate = new Date();
                const formattedDate = formatDate(entryDate, 'M/d/yyyy h:mm a', 'en-US');
                this.patientForm.controls['entryDate'].disable();
                this.patientForm.controls['entryDate'].setValue(formattedDate);
                this.patientForm.get('state').setValue(patientDetails.state !== '' ? patientDetails.state : null);
                this.patientForm.get('salesid').setValue(patientDetails.salesid !== 0 ? patientDetails.salesid : null);
                this.patientForm
                    .get('fieldservicerepid')
                    .setValue(patientDetails.fieldservicerepid !== 0 ? patientDetails.fieldservicerepid : null);

                combineLatest([
                    this.branch$,
                    this.patientForm
                        .get('branchId')
                        .valueChanges.pipe(startWith(this.patientForm.get('branchId').value)),
                ])
                    .pipe(untilDestroyed(this))
                    .subscribe(([branches, branchId]) => {
                        if (branches && Number(branchId)) {
                            const selectedBranch = branches.find(branch => branch.id === Number(branchId));
                            if (selectedBranch) {
                                this.onBranchSelected(selectedBranch);
                            }
                        }
                    });
            }
        });

        this.patientForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(
                        PatientCenterDeatilsActions.LoadCityAndStateDropDown({
                            zipCode: result,
                        })
                    );
                }
            });
    }

    get selectedInActiveReason() {
        return this.inactiveReasonList.find(res => res.code === this.patientForm.get('inactiveReason')?.value)
            ?.description;
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    categoryhandler(event: MatAutocompleteSelectedEvent): void {
        this.patientcategory.setValue(event.option.value);
    }

    CategoryFilter(val: string) {
        return this.categories.filter(option => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    save() {
        if (this.patientForm.invalid) {
            return;
        }

        // Populate the patients object from the screen
        let patient = this.patientForm.getRawValue();

        // Transform inputs
        patient = this.auxUtilService.transFormValues(patient, TranFormInputValues);

        // Transform inputs to uppercase
        patient = this.auxUtilService.transFormValuesToUpperCase(patient, TranFormInputValuesUpperCase);

        patient = this.auxUtilService.formatDateFields(patient, TransFormDateValues);

        patient = this.auxUtilService.cleanData(patient);

        //console.log(patient);

        // Save changes
        this.store.dispatch(PatientDemographicsActions.AddPatientDemographics({ patient }));
    }

    onDateChange(event, formControlName) {
        this.patientForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.patientForm,
            formControlName
        );
    }

    openReferralList() {
        // const dialogRef = this.matDialog.open(AuxReferralFromComponent,{
        //     data: null,
        //     width: '70%'
        // });
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Referral From',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: AuxReferralFromComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '60%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    // Update the cached referral data
                    this.referralData.company = result.company || '';
                    this.referralData.firstName = result.firstName || '';
                    this.referralData.lastName = result.lastName || '';

                    const displayText = this.referralData.company
                        ? `${result.id} - ${this.referralData.company}`
                        : `${result.id} - ${this.referralData.firstName} ${this.referralData.lastName}`;
                    this.patientForm.get('referCode').setValue(displayText);
                    this.patientForm.get('referId').setValue(result.id);
                    this.patientForm.get('salesid').setValue(result.salesId);
                    this.patientForm.get('fieldservicerepid').setValue(result.salesId);
                    this.save();
                }
            });
    }

    trackByIndex(index: number) {
        return index;
    }

    navigateReferralDetails() {
        this.router.navigateByUrl(`/centers/referral-center/${this.patientForm.get('referId').value}/demographics`);
    }

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientContactNotesDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.matDialog
            .open(AuxPopupComponent, {
                width: '650px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    viewPayors() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Payors',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientPayorsListDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.matDialog
            .open(AuxPopupComponent, {
                width: '650px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }
    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }

    makeCall(type: string): void {
        const phoneNumber = this.patientForm.get(type == 'Cell' ? 'cellphone' : 'phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    viewOwned() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Patient Balances',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientBalancesComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.matDialog
            .open(AuxPopupComponent, {
                width: '650px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.patientForm.get('branchId').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
