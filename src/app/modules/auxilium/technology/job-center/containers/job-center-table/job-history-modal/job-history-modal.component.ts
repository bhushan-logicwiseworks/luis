import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { JobCenterTableActions } from '../../../actions/job-center-table.actions';
import { JobHistoryDetailsComponent } from '../../../components/job-history-details/job-history-details.component';
import { JobCenterTableSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-job-history-modal',
    templateUrl: './job-history-modal.component.html',
    styleUrls: ['./job-history-modal.component.scss'],
    providers: [DateFormatPipe, DateTimeFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class JobHistoryModalComponent {
    jobHistoryData$ = this.store.select(JobCenterTableSelectors.selectJobHistory);
    loading$ = this.store.select(JobCenterTableSelectors.selectLoading);

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 65, field: 'jobId', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Job Title',
            minWidth: 150,
            field: 'jobTitle',
            filter: 'agTextColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Machine Name',
            minWidth: 125,
            field: 'machineName',
            filter: 'agTextColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Start Time',
            minWidth: 160,
            field: 'startTime',
            valueFormatter: (params: any) => this.dateTimePipe.transform(params.data.startTime),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'End Time',
            minWidth: 160,
            field: 'endTime',
            valueFormatter: (params: any) => this.dateTimePipe.transform(params.data.endTime),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Status',
            minWidth: 125,
            field: 'status',
            cellRenderer: SourceChipComponent,
            cellRendererParams: params => {
                return {
                    category: params.data.status,
                };
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Message',
            minWidth: 550,
            field: 'message',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
    ];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    rowData = [];

    visibleColumns = ['jobId', 'jobTitle', 'machineName', 'startTime', 'endTime', 'status', 'message'];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private jobId: any,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<JobHistoryModalComponent>,
        private store: Store,
        private dateFormatPipe: DateFormatPipe,
        private dateTimePipe: DateTimeFormatPipe
    ) {}

    ngOnInit() {
        combineLatest([this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                const id = this.jobId.dynamicComponentData;
                this.store.dispatch(JobCenterTableActions.GetJobHistory({ jobId: id }));
            });

        this.jobHistoryData$.pipe(untilDestroyed(this)).subscribe(res => {
            if (res) {
                this.rowData = res;
            }
        });
    }

    trackByFn(index, item) {
        return item.id; // Use a unique identifier for each item
    }

    onSelectionChanges(params) {
        this.viewHistoryDetails(params);
    }

    viewHistoryDetails(params: any) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Job History Details',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: JobHistoryDetailsComponent,
            dynamicComponentData: params.api.getSelectedRows()[0],
            submitFunction: 'submitDetails',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '50%',
                height: 'auto',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                this.refresh.next(res);
                params.api.clearFocusedCell();
            });
    }

    submitActions() {
        this.dialogRef.close();
    }
}
