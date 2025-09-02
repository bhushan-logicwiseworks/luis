import { IconModule } from '@abhinavakhil/iconify-angular';
import { AsyncPipe, Location, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import {
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperIcon,
    MatStepperNext,
    MatStepperPrevious,
} from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import icRedX from '@iconify/icons-ic/twotone-clear';
import icGreenCheck from '@iconify/icons-ic/twotone-done';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ReorderCenterService } from 'app/core/services/reorder-center.service';
import {
    ContactResult,
    NextOrderSummary,
} from 'app/shared/interfaces/auxilium/patient-center/patient-next-order-summary.interface';
import moment from 'moment';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastMessages } from '../../../../../common/constants/constVariables';
import { states } from '../../../../../shared/components/auxilium/states';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from '../../../../../shared/pipes/auxilium/aux-phonenumber.pipe';
import * as fromPatientActions from '../../actions/reorder-patient.actions';
import { ReorderPatientSelectors } from '../../reducers';
import { ReorderIndividualComponent } from '../reorder-center-individual/reorder-individual.component';

@UntilDestroy()
@Component({
    selector: 'ac-reorder-wizard-master',
    templateUrl: './reorder-wizard-master.component.html',
    styleUrls: ['./reorder-wizard-master.component.scss'],
    imports: [
        LetDirective,
        NgClass,
        MatIcon,
        MatStepper,
        MatStepperIcon,
        MatStep,
        ReactiveFormsModule,
        MatStepLabel,
        MatSelectionList,
        MatListOption,
        MatButton,
        MatStepperNext,
        MatFormField,
        MatLabel,
        MatInput,
        MatStepperPrevious,
        NgTemplateOutlet,
        IconModule,
        LoadingOverlayComponent,
        MatSelect,
        MatOption,
        AsyncPipe,
        DateFormatPipe,
        DateTimeFormatPipe,
        PhoneNumberPipe,
    ],
})
export class ReorderWizardMasterComponent implements OnInit {
    patient$ = this.store.select(ReorderPatientSelectors.selectPatient);
    insurance$ = this.store.select(ReorderPatientSelectors.selectInsurance);
    doctor$ = this.store.select(ReorderPatientSelectors.selectDoctor);
    alternateShipToAddress$ = this.store.select(ReorderPatientSelectors.selectAlternateShipToAddresses);
    datesEtc$ = this.store.select(ReorderPatientSelectors.selectDates);
    products$ = this.store.select(ReorderPatientSelectors.selectProducts);
    authorizingOptions = ['Spouse', 'Son/Daughter', 'Parent/Guardian', 'Nurse/CM/Caregiver'];
    states = states;
    isLinear = true;

    icRedX = icRedX;
    icGreenCheck = icGreenCheck;

    verifiedFlag: string = '';
    verifiedResponse: string = '';
    verifiedFile: string = '';
    insuranceIsValid = false;
    showAuthorizedByField = false;
    shipDate5;
    nextOrdershipDate;
    //showReorderAlert = false;
    showReorderAlert = true;
    patientEditMode = false;
    doctorEditMode = false;
    altShipToEditMode = false;
    now = moment().format();
    patientId: string = '';
    loading: boolean = false;
    verifying: boolean = false;
    canSendEmail: boolean = false;
    canSendText: boolean = false;

    @ViewChild(MatStepper) stepper: MatStepper;

    form: UntypedFormGroup = this.fb.group({
        steps: this.fb.array([
            this.fb.group({
                authorizedBy: [null, Validators.required],
                authorizedByName: [null, Validators.required],
            }),
            this.fb.group({
                lastName: [null, Validators.required],
                firstName: [null, Validators.required],
                sex: [null, Validators.required],
                address: [null, Validators.required],
                address2: [null],
                cellPhone: [null],
                city: [null, Validators.required],
                email: [null],
                phone: [null],
                state: [null, Validators.required],
                workPhone: [null],
                zip: [null, Validators.required],
            }),
            this.fb.group({
                address: [null],
                address2: [null],
                city: [null],
                effectiveDate: [null],
                expireDate: [null],
                state: [null],
                zip: [null],
            }),
            this.fb.group({
                foo: [null],
            }),
            this.fb.group({
                firstName: [null],
                lastName: [null],
                address: [null, Validators.required],
                address2: [null],
                city: [null, Validators.required],
                phone: [null],
                state: [null, Validators.required],
                zip: [null, Validators.required],
                fax: [null],
            }),
            this.fb.group({
                complianceQuestion1: [null, Validators.required],
            }),
            this.fb.group({
                complianceQuestion2: [null, Validators.required],
            }),
            this.fb.group({
                state: [null],
                message: [null],
                cmn: [null],
                authDate: [null],
                dos: [null],
                shipDate: [null],
                shipDate5: [null],
            }),
            this.fb.group({
                name: [null],
            }),
            this.fb.group({
                contactType: [null, Validators.required],
            }),
        ]),
    });

    ngOnInit() {
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(params => {
            this.store.dispatch(fromPatientActions.loadReorderPatientData({ id: params.get('id') }));
            this.patientId = params.get('id');
        });
        this.patient$
            .pipe(
                untilDestroyed(this),
                filter(e => !!e)
            )
            .subscribe(patient => {
                //this.showReorderAlert = !patient.self;
                (this.form.get('steps') as UntypedFormArray).get('1').patchValue(patient);
                this.canSendEmail = patient.sendEmail === 'Y';
                this.canSendText = patient.sendText === 'Y';
            });
        this.doctor$
            .pipe(
                untilDestroyed(this),
                filter(e => !!e)
            )
            .subscribe(doctor => {
                (this.form.get('steps') as UntypedFormArray).get('4').patchValue(doctor);
            });
        this.alternateShipToAddress$
            .pipe(
                untilDestroyed(this),
                filter(e => !!e)
            )
            .subscribe(alternateShipToAddress => {
                (this.form.get('steps') as UntypedFormArray).get('2').patchValue(alternateShipToAddress);
            });
        this.datesEtc$
            .pipe(
                untilDestroyed(this),
                filter(e => !!e)
            )
            .subscribe(datesEtc => {
                (this.form.get('steps') as UntypedFormArray).get('7').patchValue(datesEtc);
            });
        this.insurance$
            .pipe(
                untilDestroyed(this),
                filter(e => !!e)
            )
            .subscribe(insurance => {
                (this.form.get('steps') as UntypedFormArray).get('8').patchValue(insurance);
            });
    }

    constructor(
        private location: Location,
        private store: Store,
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private reordersService: ReorderCenterService,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    selectionChange($event: MatSelectionListChange) {
        if (!this.authorizingOptions.includes($event.options[0].value)) {
            (this.form.get('steps') as UntypedFormArray)
                .get('0')
                .get('authorizedByName')
                .patchValue($event.options[0].value);
            this.showAuthorizedByField = false;
            return this.stepper.next();
        }
        (this.form.get('steps') as UntypedFormArray).get('0').get('authorizedByName').reset();
        this.showAuthorizedByField = true;
    }

    contactChange($event: MatSelectionListChange) {
        const opt = $event.options[0].value;
        switch (opt) {
            case 'Proceed':
                return this.stepper.next();
                break;
            case 'NA':
                // no answer
                this.addPatientNote(this.patientId, 'NA');
                break;
            case 'VM':
                // voice mail
                this.addPatientNote(this.patientId, 'VM');
                break;
            case 'CMCP':
                // contact made, cannot proceed
                //this.processCMCP();
                this.addPatientNote(this.patientId, 'CMCP');
                break;
            case 'CMUMM':
                // contact made, update monthly marker
                this.addPatientNote(this.patientId, 'CMUMM');
                break;
        }
    }

    savePatient() {
        this.patientEditMode = false;
        // console.log(this.form.get('steps').get('1').value);
    }

    savePatientDoctor() {
        this.doctorEditMode = false;
        // console.log(this.form.get('steps').get('4').value);
    }

    saveAlternateShipToAddress() {
        this.altShipToEditMode = false;
        // console.log(this.form.get('steps').get('2').value);
    }

    finalize() {
        const order: NextOrderSummary = {
            PatientId: this.patientId,
            OrderConfDate: moment().format('MM/DD/YYYY'),
            OrderShipDate: (this.form.get('steps') as UntypedFormArray).get('7').get('shipDate').value,
            ExpDelivery: '3-5 business days',
            SuppliesExhaustDate: (this.form.get('steps') as UntypedFormArray).get('7').get('shipDate5').value,
            Signature: (this.form.get('steps') as UntypedFormArray).get('0').get('authorizedByName').value,
            AuthorizedBy: (this.form.get('steps') as UntypedFormArray).get('0').get('authorizedByName').value,
            InsuranceEligibility: this.verifiedFlag,
        };

        //console.log('order', order);

        this.loading = true;
        this.reordersService
            .processReorder(order)
            .toPromise()
            .then(() => {
                this.successMessage('Completed!', 'Reorder has been completed successfully.');
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.loading = false;
                this.location.back();
            });
    }

    processNoAnswer() {
        this.loading = true;
        const dto: ContactResult = {
            patientId: this.patientId,
            type: 'NA',
            note: '',
        };
        this.reordersService
            .processContact(dto)
            .toPromise()
            .then(() => {
                this.successMessage('Saved!', 'Contact Note has been saved successfully.');
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    processVoiceMail() {
        this.loading = true;
        const dto: ContactResult = {
            patientId: this.patientId,
            type: 'VM',
            note: '',
        };
        this.reordersService
            .processContact(dto)
            .toPromise()
            .then(() => {
                this.successMessage('Saved!', 'Contact Note has been saved successfully.');
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    processCMCP() {
        this.loading = true;
        const dto: ContactResult = {
            patientId: this.patientId,
            type: 'CMCP',
            note: '',
        };
        this.reordersService
            .processContact(dto)
            .toPromise()
            .then(() => {
                this.successMessage('Saved!', 'Contact Note has been saved successfully.');
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    processCMUMM() {
        this.loading = true;
        const dto: ContactResult = {
            patientId: this.patientId,
            type: 'CMUMM',
            note: '',
        };
        this.reordersService
            .processContact(dto)
            .toPromise()
            .then(() => {
                this.successMessage('Saved!', 'Contact Note has been saved successfully.');
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    inBetweenDays(date1) {
        if (date1 == '1900-01-01T00:00:00') {
            return false;
        } else {
            const daydiff = moment(date1).diff(moment(new Date()), 'days');
            if (daydiff < 45) {
                return true;
            } else {
                return false;
            }
        }
    }

    addPatientNote(id, sType) {
        this.dialog
            .open(ReorderIndividualComponent, {
                data: { patientId: id, type: sType },
                width: '600px',
                maxWidth: '100%',
                panelClass: 'ac-AccessList-dialog',
            })
            .beforeClosed()
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    VerifyInsurance() {
        this.verifying = true;
        this.reordersService
            .checkPatientEligibility(this.patientId)
            .toPromise()
            .then(data => {
                //console.log('data', data);
                this.verifiedFlag = data.flag;
                this.verifiedResponse = data.response;
                this.verifiedFile = data.fileName;
                if (this.verifiedFlag == 'ELIGIBLE') {
                    this.insuranceIsValid = true;
                } else {
                    this.insuranceIsValid = false;
                }
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                this.verifying = false;
            });
    }

    sendText(patient) {
        if (patient.cellPhone == '') {
            this.showReorerWarning();
            return;
        }

        this.loading = true;
        this.reordersService
            .sendReorderText(patient.id)
            .toPromise()
            .then(() => {
                //this.successMessage('Text Sent!', 'Order Renewal TEXT has been sent to the patient.');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: ToastMessages.CUSTOM.reorderTextSuccess,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(err => {
                console.log('error', err);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: ToastMessages.CUSTOM.reorderTextError,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }

    sendEmail(patient) {
        if (patient.email == '') {
            this.showReorerWarning();
            return;
        }

        this.loading = true;
        this.reordersService
            .sendReorderEmail(patient.id)
            .toPromise()
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: ToastMessages.CUSTOM.reorderEmailSuccess,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(err => {
                console.log('error', err);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: ToastMessages.CUSTOM.reorderEmailError,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }

    showReorerWarning() {
        this.warningMessage('This patient does not have a cell phone or email on file.', '');
    }

    notEnabled() {
        this.warningMessage('This feature is not enabled yet.', '');
    }

    warningMessage(title, message) {
        this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    show: false,
                },
                cancel: {
                    show: true,
                    label: 'Ok',
                },
            },
            dismissible: false,
        });
    }

    successMessage(title, message) {
        this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    show: false,
                },
                cancel: {
                    show: false,
                },
            },
            icon: {
                name: 'heroicons_outline:check-circle',
                color: 'success',
            },
        });
    }
}
