import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Email } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { EventTrackingTableActions } from '../../actions/event-trackingtable.actions';
import { EventTrackingIndividualComponent } from '../../components/event-tracking-individual/event-tracking-individual.component';
import { EventTrackingTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-event-tracking-table',
    templateUrl: './event-tracking-table.component.html',
    styleUrls: ['./event-tracking-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class EventTrackingTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'Logid', field: 'logid', filter: 'agMultiColumnFilter', minWidth: 85, sortIndex: 7, hide: false },
        {
            headerName: 'Status',
            field: 'status',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Patient Id',
            field: 'patientid',
            filter: 'agNumberColumnFilter',
            sortIndex: 10,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Email',
            field: 'email',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Controller Name',
            field: 'controllername',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Service Name',
            field: 'servicename',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            minWidth: 150,
        },
        {
            headerName: 'Source',
            field: 'source',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Created Date',
            field: 'createdDate',
            valueFormatter: (params: any) => this.dateTimeFormatePipe.transform(params.data.createdDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
            minWidth: 130,
        },
        {
            headerName: 'Created By',
            field: 'createdBy',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.receivedDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
            minWidth: 125,
        },
        {
            headerName: 'Message',
            field: 'message',
            filter: 'agMultiColumnFilter',
            minWidth: 850,
            sortIndex: 7,
            hide: false,
            cellStyle: { 'white-space': 'nowrap', 'text-overflow': 'ellipsis', overflow: 'hidden' },
        },
    ];

    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = ['logid', 'status', 'email', 'controllername', 'servicename', 'createdDate', 'message'];

    data$ = this.store.select(EventTrackingTableSelectors.selectStatusInformation);

    loading$ = this.store.select(EventTrackingTableSelectors.selectLoading);

    pageSizeOption = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    selectedRowIndex: number = -1;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dateTimeFormatePipe: DateTimeFormatPipe,
        private dateFormatePipe: DateFormatPipe,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private searchService: AuxSearchService
    ) {}

    selection = new SelectionModel<Email>(true, []);
    filterSlugStatus = '';

    ngOnInit() {
        combineLatest([this.route.queryParamMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlugStatus = paramMap.get('status');
                const filterSlugdateRange = paramMap.get('dateRange');
                // make sure we do not reset filter on page load and when we have same params
                if (filterSlugStatus && this.filterSlugStatus !== '' && filterSlugStatus !== this.filterSlugStatus) {
                    this.searchService.resetFilter.next({ resetGrid: true });
                }
                this.filterSlugStatus = filterSlugStatus;
                switch (filterSlugStatus) {
                    case 'information':
                        this.selection.clear();
                        this.store.dispatch(
                            EventTrackingTableActions.LoadEventInformation({
                                status: 'INFORMATION',
                                dateRangeOption: filterSlugdateRange.toUpperCase(),
                            })
                        );
                        break;

                    case 'warning':
                        this.selection.clear();
                        this.store.dispatch(
                            EventTrackingTableActions.LoadEventInformation({
                                status: 'WARNING',
                                dateRangeOption: filterSlugdateRange.toUpperCase(),
                            })
                        );
                        break;

                    case 'error':
                        this.selection.clear();
                        this.resetGridFilters();
                        this.store.dispatch(
                            EventTrackingTableActions.LoadEventInformation({
                                status: 'ERROR',
                                dateRangeOption: filterSlugdateRange.toUpperCase(),
                            })
                        );
                        break;

                    default:
                        this.selection.clear();
                        this.store.dispatch(
                            EventTrackingTableActions.LoadEventInformation({
                                status: 'ERROR',
                                dateRangeOption: 'TODAY',
                            })
                        );
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(emails => {
            this.rowData = emails;
        });

        this.actions$
            .pipe(ofType(EventTrackingTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    onSelectionChanged(event: any) {
        this.selection.setSelection(...event.api.getSelectedRows());
        if (event.api.getSelectedRows().length > 0) {
            this.openItem(event);
        }
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'EVENT DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: EventTrackingIndividualComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
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
                item.api.clearFocusedCell();
            });
    }

    openEmailDrawer(event) {
        this.selectedRowIndex = event.rowIndex;
        event.api.deselectAll();
    }

    ngAfterViewInit() {}

    isDisabled() {
        return this.selection.isEmpty();
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

    resetGridFilters() {}
}
