import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject } from 'rxjs';
import { PatientAutomatedEmailsActions } from '../../../actions/patient-automated-emails.actions';
import { AutomatedEmailsSelectors } from '../../../reducers';
import { AutomatedEmailsDetailsComponent } from '../automated-emails-details/automated-emails-details.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { DateTimeFormatPipe as DateTimeFormatPipe_1 } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'app-patient-automated-emails',
    templateUrl: './patient-automated-emails.component.html',
    styleUrls: ['./patient-automated-emails.component.scss'],
    imports: [
        MatIcon,
        AsyncPipe,
        DateTimeFormatPipe_1,
    ],
})
export class PatientAutomatedEmailsComponent implements OnInit {
    data$ = this.store.select(AutomatedEmailsSelectors.selectAutomatedEmails);
    loading$ = this.store.select(AutomatedEmailsSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    totalEmails: any;
    filterEmails: any;
    isActiveThisMonth = true;
    isActiveLastMonth = false;
    isActiveOlder = false;
    constructor(
        private store: Store,
        private router: Router,
        private dateTime: DateTimeFormatPipe,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const patientId = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientAutomatedEmailsActions.LoadAutomatedEmails({ patientId }));
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
            dynamicComponent: AutomatedEmailsDetailsComponent,
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
}
