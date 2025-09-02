import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
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
import { MatOption } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { ApiService } from 'app/core/services/api.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxSelectDropdownOption } from 'app/shared/components/auxilium/aux-select-dropdown/aux-select-dropdown-option.interface';
import { Categories } from 'app/shared/components/auxilium/categories';
import { BestTime, DropDownOptions, Language } from 'app/shared/components/auxilium/contactInfo';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { Observable, Subject, Subscription } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { DefaultDate } from '../../../../../shared/directives/auxilium/aux-default-date.directive';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PatientCenterDeatilsActions } from '../../actions/patient-details.action';
import { PatientCenterDetailsSelectors, PatientDemographicsSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';

@UntilDestroy()
@Component({
    selector: 'ac-patient-demographics-view',
    templateUrl: './patient-demographics-view.component.html',
    styleUrls: ['./patient-demographics-view.component.scss'],
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
        // MatSelect,
        // MatSelectTrigger,
        // NgFor,
        MatTooltip,
        MatPrefix,
        AsyncPipe,
    ],
})
export class PatientDemographicsViewComponent implements OnInit {
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

    bestTime = BestTime;
    stateMapping = stateMapping;
    patient: Patient;
    categories = Categories;
    patient$ = this.store.select(PatientCenterDetailsSelectors.selectPatientDetails);
    demographics$ = this.store.select(PatientDemographicsSelectors.selectdemographics);

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

    loading$ = this.store.select(PatientCenterDetailsSelectors.selectLoading);
    alert: any;
    refresh = new Subject();
    inactiveReasonList;
    refresh$ = this.refresh.asObservable();
    subscription: Subscription;

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
        // this.toolbarData = [
        //     {
        //         title: 'Save',
        //         type: 'basic',
        //         icon: 'mat_outline:save',
        //         function: () => {
        //             this.save();
        //         },
        //     },
        //     {
        //         title: 'View Contact Notes',
        //         type: 'basic',
        //         icon: 'mat_outline:speaker_notes',
        //         function: () => {
        //             this.viewPatientNotes();
        //         },
        //     },
        //     {
        //         title: 'View Payors',
        //         type: 'basic',
        //         icon: 'mat_outline:money',
        //         function: () => {
        //             this.viewPayors();
        //         },
        //     },
        //     {
        //         title: 'View Owed',
        //         type: 'basic',
        //         icon: 'mat_outline:mode_comment',
        //         function: () => {
        //             this.viewOwned();
        //         },
        //     },
        // ];
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
            deductibleamount: [''],
        });

        // Make all form controls disabled for view-only mode
        // Object.keys(this.patientForm.controls).forEach(key => {
        //     this.patientForm.get(key).disable();
        // });

        // Fetch patient data only once
        const patientId = parseInt(window.location.href.split('/')[5], 10);
        this.store.dispatch(PatientCenterDeatilsActions.LoadPatientDetails({ id: patientId }));

        this.patient$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.patient = data;
                const patientDetails: Record<string, any> = {
                    ...this.patient,
                };

                // Update form values without enabling editing
                this.patientForm.patchValue(patientDetails, {
                    emitEvent: false,
                });

                // Set status-dependent displays
                // this.showContactNote = ['I', 'M', 'C', 'S'].includes(patientDetails.patientstatus);
            }
        });
    }

    // Remove any save/edit functionality
    // Keep only view helper methods
    onDateChange(event, formControlName) {
        // View only - no changes needed
    }
}
