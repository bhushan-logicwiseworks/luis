import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { combineLatest } from 'rxjs';
import { PhoneNumberPipe } from '../../../../../shared/pipes/auxilium/aux-phonenumber.pipe';
import { QuickFaxToolActions } from '../../actions/quick-fax-tool.action';
import { PatientCenterDetailsSelectors, QuickFaxSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-quick-fax-tool',
    templateUrl: './quick-fax-tool.component.html',
    styleUrls: ['./quick-fax-tool.component.scss'],
    providers: [DateFormatPipe],
    imports: [
        LetDirective,
        MatList,
        MatRipple,
        MatIcon,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        MatButton,
        AsyncPipe,
        PhoneNumberPipe,
    ],
})
export class QuickFaxToolComponent implements OnInit {
    quickFaxData: Object[];
    patientDetails: any;
    patientName: string;
    patientDob: string;
    patientId: number;
    patientEmail: string;
    patient$ = this.store.select(PatientCenterDetailsSelectors.selectPatientDetails);
    doctorDetails$ = this.store.select(QuickFaxSelectors.selectDoctorDetails);
    loading$ = this.store.select(QuickFaxSelectors.selectLoading);

    constructor(
        private store: Store,
        private dateFormatPipe: DateFormatPipe,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.patientId = Number(this.router.url.split('/')[3]);
        this.store.dispatch(QuickFaxToolActions.getDoctorDetails({ patientId: this.patientId }));
        combineLatest([this.patient$, this.doctorDetails$])
            .pipe(untilDestroyed(this))
            .subscribe(([patient, doctor]) => {
                this.patientId = patient?.id;
                this.patientEmail = patient?.email;
                const patientDOB = patient?.dob;
                const patientName = patient?.firstname + ' ' + patient?.lastname;
                const doctorName =
                    doctor?.firstName || doctor?.lastName ? doctor?.firstName + ' ' + doctor?.lastName : null;

                this.quickFaxData = [
                    {
                        title: 'VISIT NOTES DO NOT INDICATE PATIENT IS USING THE CGM AS PRESCRIBED',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. The patient’s last visit notes we received do not contain Medicare’s required 6-month continuation of medical need documentation stating the PATIENT IS USING THE CGM AS PRESCRIBED. If deemed appropriate, please update the visit notes with a continuation of medical need comment and forward via Acentus fax 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal to prevent a supply disruption. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'PATIENT DOES NOT WANT TO USE A CGM',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. After contacting the patient, they have decided not to move forward with CGM at this time. Patient indicated they will address the reasons with the doctor. We will cancel this request, however if the patient decides otherwise, they were advised to contact us for service onboarding. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'PATIENT DOES NOT QUALIFY FOR CGM',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. Unfortunately, the visit notes received do not contain the required documentation to meet the Medicare CGM DME benefit as outlined in the most recent Medicare CGM LCD. This order has been cancelled as we are unable to supply the patient at this time. If the patient’s medical condition changes, please forward visit notes via Acentus fax 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal and we will reopen this patient referral. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'PATIENT BEING INACTIVATED DUE TO NO CONTACT',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. We have made numerous attempts to contact the patient for CGM reorders to no avail. We have also tried all contact sources listed on the demographic and visit notes and they are not returning our messages. We are inactivating service with this patient; however we will reopen the request if the patient contacts us. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'MISSING VISIT NOTES REQUEST',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. Unfortunately, visit notes were not included when the patient referral was initially sent to us. As required by Medicare, please provide visit notes no older than 6 months via Acentus fax: 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'CANNOT REACH PATIENT',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. We have made numerous attempts to contact the patient to no avail. We have tried all contact sources listed on the demographic and visit notes and they are not returning our messages. This order has been cancelled; however, we will reopen the request if the patient contacts us.`,
                    },
                    {
                        title: 'ACENTUS IS OUT OF NETWORK WITH PATIENT’S INSURANCE',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. Unfortunately, Acentus is out of network with this patient’s insurance. Please forward this patient referral to a supplier who is in-network. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'MISSING DEMOGRAPHICS REQUEST',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. Unfortunately, the DEMOGRAPHIC sheet was not included when the patient referral was initially sent to us. For us to proceed with the onboarding process, please send us the patient’s demographic sheet showing their current insurance plans via Acentus fax 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'PATIENT SWITCHING SUPPLIERS TO ACENTUS-NEED ORIGINAL VISIT NOTES',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. During our insurance verification process, we found a different CGM supplier has qualified this patient for a CGM and Medicare was billed for a CGM reader in the past 5 years. Medicare requires us to maintain the original visit notes that show the patient qualified for a CGM. Please forward those original visit notes via Acentus fax 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal so we can continue with the patient onboarding process. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'PATIENT DOES NOT WANT TO SWITCH CGM SUPPLIERS',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. After communicating with this patient, they indicated they are currently set up and receiving CGM supplies from another DME company and do not want to switch to Acentus at this time. We advised patient to contact us if that changes as we are happy to assist. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                    {
                        title: 'MISSING SWO REQUEST WITH COMPLETED SWO',
                        defaultText: `Thank you for the CGM patient referral for ${patientName} with DOB ${this.dateFormatPipe.transform(patientDOB)}. Unfortunately, a completed/signed/dated Standard Written Order (SWO) was not included when the patient referral was initially sent to us. As required by Medicare, please have the following SWO signed & dated by ${doctorName !== null ? doctorName : 'XXXXXX XXXXXXXXX'} and forwarded via Acentus fax 866-695-2183, Parachute or drag & drop into your Acentus ANSWERS portal. Please contact us at service@acentus365.com with any questions. Thank you!`,
                    },
                ];
            });
    }

    sendFaxMessage(title: string, faxMessageText: string) {
        this.store.dispatch(
            QuickFaxToolActions.sendFaxMessage({ patientId: this.patientId, title: title, message: faxMessageText })
        );
    }
}
