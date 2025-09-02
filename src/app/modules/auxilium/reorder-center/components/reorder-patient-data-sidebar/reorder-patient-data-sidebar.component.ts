import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ReorderCenterService } from 'app/core/services/reorder-center.service';
import * as fromReorderPatientActions from '../../actions/reorder-patient.actions';
import { ReorderPatientSelectors } from '../../reducers';
import { ReorderIndividualComponent } from '../reorder-center-individual/reorder-individual.component';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icPhone from '@iconify/icons-ic/twotone-phone';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIcon } from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';
import { MatRipple } from '@angular/material/core';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MatButton, MatAnchor } from '@angular/material/button';
import { NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PhoneNumberPipe } from '../../../../../shared/pipes/auxilium/aux-phonenumber.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-reorder-patient-data-sidebar',
    templateUrl: './reorder-patient-data-sidebar.component.html',
    styleUrls: ['./reorder-patient-data-sidebar.component.scss'],
    imports: [
        MatIcon,
        LetDirective,
        MatRipple,
        IconModule,
        MatButton,
        NgClass,
        MatList,
        MatAnchor,
        MatListItem,
        AsyncPipe,
        CurrencyPipe,
        DateFormatPipe,
        PhoneNumberPipe,
    ],
})
export class ReorderPatientDataSidebarComponent implements OnInit {
    patient$ = this.store.select(ReorderPatientSelectors.selectPatient);
    doctor$ = this.store.select(ReorderPatientSelectors.selectDoctor);
    insurance$ = this.store.select(ReorderPatientSelectors.selectInsurance);
    datesEtc$ = this.store.select(ReorderPatientSelectors.selectDates);

    fields = [
        { field: 'firstName', title: 'First Name' },
        { field: 'lastName', title: 'Last Name' },
        { field: 'address', title: 'Address' },
        {
            field: 'address2',
            title: 'Address Addition',
        },
        { field: 'city' },
        { field: 'state' },
        { field: 'zip' },
        { field: 'phone', icon: 'phone' },
        {
            field: 'workPhone',
            title: 'Phone (Work)',
            icon: 'phone',
        },
        {
            field: 'cellPhone',
            icon: 'phone',
            title: 'Phone (Cell)',
        },
        { field: 'email', icon: 'email' },
    ];

    /*
     *
     * Patient First Name and Last Name
     * Address1
     * Address2 (if available)
     * City,
     * State, Zip
     * Phone (if available)
     * Work phone (if available)
     * Cell phone (if available)
     * Email (if available)
     *
     * **/

    icPhone = icPhone;
    icMail = icMail;
    icMoreVert = icMoreVert;

    constructor(
        private store: Store,
        private dialog: MatDialog,
        private reordersService: ReorderCenterService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {}

    makeLink(d: string, value: any) {
        const el = document.createElement('a');
        if (d === 'phone') {
            el.href = `tel:${value}`;
        } else {
            el.href = `mailto:${value}`;
        }
        el.click();
    }

    openPatientNotes() {
        this.store.dispatch(fromReorderPatientActions.openPatientNotes());
    }

    addPatientNote(id: string) {
        this.dialog
            .open(ReorderIndividualComponent, {
                data: { patientId: id.toString(), type: 'NORMAL' },
                width: '600px',
                maxWidth: '100%',
                panelClass: 'ac-AccessList-dialog',
            })
            .beforeClosed()
            .pipe(untilDestroyed(this))
            .subscribe();
    }

    isExpiring(val) {
        if (val == '1900-01-01T00:00:00') {
            return false;
        }
        let newDate = new Date(val);
        let dateDoc = newDate.getTime();
        let today = new Date();
        let dateTS = new Date().setDate(today.getDate() + 30);
        let dateNew = new Date(dateTS);
        let date30 = dateNew.getTime();
        if (dateDoc < date30) {
            return true;
        } else {
            return false;
        }
    }

    SendRequestSWO(pat) {
        if (pat.patientCategory != 'CGM') {
            this.warningMessage('WARNING!', 'Fax is only supported for CGM patients, for now.');
        } else {
            const dialogRef = this._fuseConfirmationService.open({
                title: 'Send Fax?',
                message: 'Sending a fax to the referral source',
                actions: {
                    confirm: {
                        label: 'Yes, send it!',
                    },
                    cancel: {
                        label: 'Cancel',
                    },
                },
            });
            dialogRef
                .afterClosed()
                .pipe(untilDestroyed(this))
                .subscribe(result => {
                    if (result == 'confirmed') {
                        this.reordersService
                            .sendSWO(pat.id)
                            .toPromise()
                            .then(() => {
                                this.successMessage('DONE!', 'The fax has been scheduled. It will be sent shortly.');
                            })
                            .catch(err => {
                                console.log('error', err);
                            })
                            .finally(() => {
                                //console.log('finally');
                            });
                    }
                });
        }
    }

    SendRequestVisitNotes(pat) {
        if (pat.patientCategory != 'CGM') {
            this.warningMessage('WARNING!', 'Fax is only supported for CGM patients, for now.');
        } else {
            const dialogRef = this._fuseConfirmationService.open({
                title: 'Send Fax?',
                message: 'Sending a fax to the referral source',
                actions: {
                    confirm: {
                        label: 'Yes, send it!',
                    },
                    cancel: {
                        label: 'Cancel',
                    },
                },
            });
            dialogRef
                .afterClosed()
                .pipe(untilDestroyed(this))
                .subscribe(result => {
                    if (result == 'confirmed') {
                        this.reordersService
                            .sendVisitNotes(pat.id)
                            .toPromise()
                            .then(() => {
                                this.successMessage('DONE!', 'The fax has been scheduled. It will be sent shortly.');
                            })
                            .catch(err => {
                                console.log('error', err);
                            })
                            .finally(() => {
                                //console.log('finally');
                            });
                    }
                });
        }
    }

    warningMessage(title, message) {
        this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    label: 'OK',
                },
                cancel: {
                    show: false,
                },
            },
        });
    }

    successMessage(title, message) {
        this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    label: 'OK',
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
