import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { CheckListOptions } from 'app/shared/components/auxilium/contactInfo';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import {
    TranFormInputValues,
    patientOnBoardingCheckList,
    referralCheckList,
} from '../../../../../shared/components/auxilium/patient-checklists.enum';
import { PatientChecklistActions } from '../../actions/patient-checklist.action';
import { PatientCenterDeatilsActions } from '../../actions/patient-details.action';
import { PatientCenterDetailsSelectors, PatientChecklistSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatInput } from '@angular/material/input';

@UntilDestroy()
@Component({
    selector: 'ac-patient-checklists',
    templateUrl: './patient-checklists.component.html',
    styleUrls: ['./patient-checklists.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatIcon,
        AuxSelectDropdownComponent,
        MatFormField,
        MatLabel,
        MatInput,
    ],
})
export class PatientChecklistsComponent implements OnInit {
    toolbarData: FuseNavigationItem[];
    patientForm: FormGroup;
    title: string;
    patient: Patient;
    patient$ = this.store.select(PatientCenterDetailsSelectors.selectPatientDetails);
    checklist$ = this.store.select(PatientChecklistSelectors.selectchecklist);
    selectOptions = CheckListOptions;
    onBoardingCheckList = patientOnBoardingCheckList;
    onReferralCheckList = referralCheckList;

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private auxUtilService: AuxUtilService,
        private matDialog: MatDialog,
        private titleService: TitleService
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
        ];
    }

    ngOnInit(): void {
        this.patientForm = this.fb.group({
            id: [0],
            pwocompleted: [''],
            qualifiedcgm: [''],
            chartnotes: [''],
            medicarepatient: [''],
            contactattempt1: [''],
            contactattempt2: [''],
            contactattempt3: [''],
            patientinterview: [''],
            insuranceverified: [''],
            completedpworeceived: [''],
            qualifyingnotesreceived: [''],
            dispositionholdnote: [''],
            authrequired: ['N'],
            hardship: [''],
        });

        //  Set Title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);
        const patientId = parseInt(window.location.href.split('/')[5], 10);
        this.store.dispatch(PatientCenterDeatilsActions.LoadPatientDetails({ id: patientId }));
        this.patient$.pipe(untilDestroyed(this)).subscribe(data => {
            this.patient = data;
            this.patientForm.patchValue(this.patient);
        });
    }

    save() {
        // Populate the patients object from the screen
        let patient = this.patientForm.value;

        // let patient: Patient = this.patientForm.value;
        patient = this.auxUtilService.transFormValues(patient, TranFormInputValues);

        // Transform inputs
        patient.id = this.patient.id;

        this.store.dispatch(PatientChecklistActions.AddPatientChecklist({ patient }));
    }

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
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
}
