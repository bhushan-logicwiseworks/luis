import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { PatientCenterDeatilsActions } from 'app/modules/auxilium/patient-center/actions/patient-details.action';
import { PatientCenterDetailsSelectors } from 'app/modules/auxilium/patient-center/reducers';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../aux-ag-grid/aux-ag-grid.component';

@UntilDestroy()
@Component({
    selector: 'app-aux-referral-from',
    templateUrl: './aux-referral-from.component.html',
    styleUrls: ['./aux-referral-from.component.scss'],
    providers: [PhoneNumberPipe, DateTimeFormatPipe],
    imports: [
        NgClass,
        AuxAgGridComponent,
        AsyncPipe,
    ],
})
export class AuxReferralFromComponent implements OnInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 65, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Refer Code', minWidth: 70, field: 'referCode', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Last Name', minWidth: 70, field: 'lastName', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'First Name', minWidth: 70, field: 'firstName', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Company', minWidth: 350, field: 'company', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Sales Code', minWidth: 70, field: 'salesCode', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Address', minWidth: 125, field: 'address', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'City', minWidth: 125, field: 'city', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Phone',
            minWidth: 101,
            field: 'phone',
            filter: 'agMultiColumnFilter',
            hide: false,
            valueFormatter: params => this.phoneNumber.transform(params.data.phone),
        },
        { headerName: 'NPI', minWidth: 101, field: 'npi', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Status', minWidth: 101, field: 'status', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Add Date',
            minWidth: 135,
            field: 'addDate',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.addDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            hide: false,
        },
        { headerName: 'User', minWidth: 101, field: 'addUserId', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Opt-In', minWidth: 101, field: 'doesOptIn', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Email', minWidth: 101, field: 'email', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Fax', minWidth: 101, field: 'fax', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Notes', minWidth: 101, field: 'notes', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Provider', minWidth: 101, field: 'provider', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Sales Id', minWidth: 101, field: 'salesId', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'State', minWidth: 101, field: 'state', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Tax Id', minWidth: 101, field: 'taxId', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Taxonomy', minWidth: 101, field: 'taxonomy', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Territory', minWidth: 101, field: 'territory', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Title', minWidth: 101, field: 'title', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Zip', minWidth: 101, field: 'zip', filter: 'agMultiColumnFilter', hide: false },
    ];
    visibleColumns = ['id','lastName','firstName','company','salesCode','city'];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(PatientCenterDetailsSelectors.selectLoading);
    rowData$ = this.store.select(PatientCenterDetailsSelectors.selectReferrals);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    rowData;

    constructor(
        private phoneNumber: PhoneNumberPipe,
        private store: Store,
        private _matDialog: MatDialogRef<any>,
        private dateTime: DateTimeFormatPipe,
        private searchService: AuxSearchService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(PatientCenterDeatilsActions.LoadPatientReferrals());
        this.rowData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result.length) {
                this.rowData = result.map(res => {
                    return {
                        ...res,
                        territory: res.territory ? res.territory.trim() : '',
                    };
                });
            }
            this.rowData = result;
        });
    }

    selectRow(row: any) {
        this._matDialog.close(row);
        this.clearFilter();
    }

    selectionChange(params) {
        this.selectRow(params.api.getSelectedRows()[0]);
    }
    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
