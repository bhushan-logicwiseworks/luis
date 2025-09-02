import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ReorderCenterService } from 'app/core/services/reorder-center.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { PatientEFirstActions } from '../../../actions/patient-efirst.actions';
import { EFirstSelectors } from '../../../reducers';
import { EFirstDetailsComponent } from '../patient-efirst-details/efirst-details.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { DateTimeFormatPipe as DateTimeFormatPipe_1 } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'app-patient-efirst',
    templateUrl: './patient-efirst.component.html',
    styleUrls: ['./patient-efirst.component.scss'],
    imports: [
        FuseHorizontalNavigationComponent,
        MatIcon,
        AsyncPipe,
        DateTimeFormatPipe_1,
    ],
})
export class PatientEFirstComponent implements OnInit {
    toolbarData: FuseNavigationItem[];
    data$ = this.store.select(EFirstSelectors.selectPatientEFirst);
    loading$ = this.store.select(EFirstSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    totalEmails: any;
    filterEmails: any;
    isActiveThisMonth = true;
    isActiveLastMonth = false;
    isActiveOlder = false;

    patientId: any;
    verifying: boolean = false;
    verifiedFlag: string = '';
    verifiedResponse: string = '';
    verifiedFile: string = '';
    insuranceIsValid = false;

    constructor(
        private store: Store,
        private router: Router,
        private dateTime: DateTimeFormatPipe,
        private dialog: MatDialog,
        private reordersService: ReorderCenterService
    ) {
        this.toolbarData = [
            {
                title: 'Verify Insurance',
                type: 'basic',
                icon: 'mat_outline:check',
                function: () => {
                    this.verifyInsurance();
                },
            },
        ];
    }

    ngOnInit(): void {
        const patientId = Number(this.router.url.split('/')[3]);
        this.patientId = patientId;
        this.store.dispatch(PatientEFirstActions.LoadEFirst({ patientId }));
        this.data$.subscribe(emails => {
            this.totalEmails = emails;
            this.showThisMonth();
        });
    }

    showThisMonth() {
        const now = new Date();
        const thismonth = new Date();
        const thisMonthStart = thismonth.getMonth();
        const filteredData = this.totalEmails?.filter(item => {
            const addDate = new Date(item?.addDate);
            return addDate.getMonth() === thisMonthStart;
        });
        this.filterEmails = filteredData;
        this.isActiveThisMonth = true;
        this.isActiveLastMonth = false;
        this.isActiveOlder = false;
    }

    showLastMonth() {
        const now = new Date();
        const thismonth = new Date();
        const thisMonthStart = thismonth.getMonth() - 1;
        const filteredData = this.totalEmails.filter(item => {
            const addDate = new Date(item.addDate);
            return addDate.getMonth() === thisMonthStart;
        });
        this.filterEmails = filteredData;
        this.isActiveThisMonth = false;
        this.isActiveLastMonth = true;
        this.isActiveOlder = false;
    }

    showOlder() {
        const now = new Date();
        const thismonth = new Date();
        const thisMonthStart = thismonth.getMonth() - 2;
        const filteredData = this.totalEmails.filter(item => {
            const addDate = new Date(item.addDate);
            return addDate.getMonth() <= thisMonthStart;
        });
        this.filterEmails = filteredData;
        this.isActiveThisMonth = false;
        this.isActiveLastMonth = false;
        this.isActiveOlder = true;
    }

    onSelectionChanged(params) {
        this.openAutomatedEmail(params);
    }

    openAutomatedEmail(email) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: EFirstDetailsComponent,
            dynamicComponentData: email || null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
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
            .subscribe(result => {
                this.refresh.next(result);
            });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    verifyInsurance() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You're about to verify insurance for this patient!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!',
        }).then(result => {
            if (result.isConfirmed) {
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
                            Swal.fire('Good job!', 'Patient is Eligible!', 'success');
                        } else {
                            this.insuranceIsValid = false;
                            Swal.fire('Oops!', 'Patient is NOT Eligible!', 'error');
                        }
                    })
                    .catch(err => {
                        console.log('error', err);
                    })
                    .finally(() => {
                        this.verifying = false;
                        this.store.dispatch(PatientEFirstActions.LoadEFirst({ patientId: this.patientId }));
                    });
            }
        });
    }
}
