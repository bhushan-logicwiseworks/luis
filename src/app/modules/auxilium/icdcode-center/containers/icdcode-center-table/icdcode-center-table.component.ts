import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { IcdCodeCenterTableActions } from '../../actions/icdcode-center-table.actions';
import { IcdCodesCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-icdcode-center-table',
    templateUrl: './icdcode-center-table.component.html',
    styleUrls: ['./icdcode-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class IcdCodeCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Icd9 Code',
            minWidth: 100,
            field: 'icd9code',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Status',
            minWidth: 100,
            field: 'status',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 300,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Change Indicator',
            minWidth: 160,
            field: 'changeindicator',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Code Status',
            minWidth: 130,
            field: 'codestatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Short Description',
            minWidth: 200,
            field: 'shortdescription',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Medium Description',
            minWidth: 170,
            field: 'mediumdescription',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Long Description',
            minWidth: 170,
            field: 'longdescription',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Icd10 Code',
            minWidth: 100,
            field: 'icd10code',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Icd10 Description',
            minWidth: 170,
            field: 'icd10description',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Flags',
            minWidth: 110,
            field: 'flags',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 200,
            field: 'adddate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.adddate),
            filterParams: filterParams,
            sortIndex: 20,
            hide: false,
        },
        {
            headerName: 'Added By',
            minWidth: 125,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Delete Permanently',
                        action: this.deleteData.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 17,
            hide: false,
            sortable: false,
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

    visibleColumns = [
        'icd9code',
        'status',
        'description',
        'changeindicator',
        'codestatus',
        'shortdescription',
        'icd10code',
        'flags',
        'actions',
    ];

    loading$ = this.store.select(IcdCodesCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(IcdCodesCenterTableSelectors.selectIcdCodesReps))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private dateTime: DateTimeFormatPipe,
        private phonenumber: PhoneNumberPipe,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    selection = new SelectionModel<ICDCodeDisplay>(true, []);

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(IcdCodeCenterTableActions.LoadIcdCodes());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(icdcoderep => {
            this.rowData = icdcoderep;
        });

        this.actions$
            .pipe(ofType(IcdCodeCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openItem(item) {
        this.router.navigateByUrl(`/centers/icdcode-center/${item.api.getSelectedRows()[0].id}/icdcode-details`);
    }

    deleteData(data) {
        this.deleteContact(data.data);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: ICDCodeDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete ICD Code',
            message: 'Are you sure you want to delete this ICD Code? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the contact
                    this.store.dispatch(IcdCodeCenterTableActions.DeleteIcdCode({ dto }));
                }
            });
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
