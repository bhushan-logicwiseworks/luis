import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, startWith, Subject } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { DateFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PatientChargesActions } from '../../../actions/patient-charges.action';
import { PatientChargesSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientGroupEditChargeComponent } from '../patient-group-edit-charge/patient-group-edit-charge.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-efirst',
    templateUrl: './patient-charges-table.component.html',
    styleUrls: ['./patient-charges-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, LoadingOverlayComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientChargesTableComponent implements OnInit {
    title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    patientChargesData$ = this.store.select(PatientChargesSelectors.selectPatientCharges);
    loading$ = this.store.select(PatientChargesSelectors.selectLoading);
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    field: 'checkedField',
                    width: 35,
                    maxWidth: 35,
                    pinned: 'left',
                    resizable: false,
                    suppressMovable: true,
                    sortable: false,
                    filter: false,
                    lockPosition: 'left',
                    headerName: '',
                },
            },
            rowMultiSelectWithClick: true,
            headerHeight: 30,
            rowHeight: 36,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            field: 'id',
            minWidth: 70,
            hide: true,
            filter: 'agMultiColumnFilter',
            sortIndex: 99,
            onCellClicked: this.openChargeDetails.bind(this),
        },

        {
            headerName: 'SVC DATE',
            field: 'svcDate',
            minWidth: 125,
            sort: 'desc',
            sortIndex: 0,
            filter: 'agDateColumnFilter',
            valueFormatter: p => this.dateFormat.transform(p.data.svcDate),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'TO DATE',
            field: 'toDate',
            minWidth: 125,
            sortIndex: 1,
            filter: 'agDateColumnFilter',
            valueFormatter: p => this.dateFormat.transform(p.data.toDate),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'ITEM ID',
            field: 'itemId',
            minWidth: 75,
            sortIndex: 2,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'ITEM CODE',
            field: 'itemCode',
            minWidth: 125,
            sortIndex: 2,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'HCPCS',
            field: 'hcpcsCode',
            minWidth: 100,
            sortIndex: 3,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'STOP DATE',
            field: 'stopDate',
            minWidth: 125,
            sortIndex: 6,
            valueFormatter: p => this.dateFormat.transform(p.data.stopDate),
            filter: 'agDateColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'T',
            field: 'billType',
            minWidth: 50,
            sortIndex: 5,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'DESCRIPTION',
            field: 'description',
            minWidth: 250,
            sortIndex: 4,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'LAST BILLED',
            field: 'lastDateBilled',
            minWidth: 125,
            sortIndex: 7,
            valueFormatter: p => this.dateFormat.transform(p.data.lastDateBilled),
            filter: 'agDateColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'CMN EXPIRE',
            field: 'cmnExpire',
            minWidth: 125,
            sortIndex: 9,
            valueFormatter: p => this.dateFormat.transform(p.data.cmnExpire),
            filter: 'agDateColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'NOTES EXPIRE',
            field: 'notesExpireDate',
            minWidth: 125,
            sortIndex: 8,
            valueFormatter: p => this.dateFormat.transform(p.data.notesExpireDate),
            filter: 'agDateColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'AUTH DATE',
            field: 'authDate',
            minWidth: 125,
            sortIndex: 10,
            valueFormatter: p => this.dateFormat.transform(p.data.authDate),
            filter: 'agDateColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'BRANCH',
            field: 'branchCode',
            minWidth: 100,
            sortIndex: 11,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'PREPAID',
            field: 'prepaid',
            minWidth: 100,
            sortIndex: 13,
            valueFormatter: p => this.currency.transform(p.data.prepaid, 'USD', 'symbol'),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'DUE PRIMARY',
            field: 'duePrimary',
            minWidth: 120,
            sortIndex: 14,
            valueFormatter: p => this.currency.transform(p.data.duePrimary, 'USD', 'symbol'),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'DUE SECONDARY',
            field: 'dueSecondary',
            minWidth: 120,
            sortIndex: 15,
            valueFormatter: p => this.currency.transform(p.data.dueSecondary, 'USD', 'symbol'),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'Price',
            field: 'submitted',
            minWidth: 120,
            sortIndex: 16,
            valueFormatter: p => this.currency.transform(p.data.submitted, 'USD', 'symbol'),
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'ACCESSION #',
            field: 'accessionNo',
            minWidth: 120,
            sortIndex: 17,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'CMN FORM',
            field: 'cmnForm',
            minWidth: 100,
            sortIndex: 12,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'NOTES',
            field: 'notes',
            minWidth: 150,
            sortIndex: 18,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'NARRATIVE',
            field: 'narrative',
            minWidth: 150,
            sortIndex: 19,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
        {
            headerName: 'ASSET #',
            field: 'assetNo',
            minWidth: 120,
            sortIndex: 20,
            filter: 'agMultiColumnFilter',
            onCellClicked: this.openChargeDetails.bind(this),
        },
    ];

    visibleColumns = [
        'checkedField',
        'id',
        'svcDate',
        'itemId',
        'itemCode',
        'hcpcsCode',
        'stopDate',
        'tranType',
        'billType',
        'description',
        'lastDateBilled',
        'cmnExpire',
        'notesExpireDate',
        'authDate',
        'submitted',
        'cmnForm',
    ];
    rowData;
    patientId;
    toolbarData: FuseNavigationItem[];
    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private actions$: Actions,
        private currency: CurrencyPipe,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateTime: DateTimeFormatPipe,
        private dialog: MatDialog,
        private dateFormat: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Refresh',
                type: 'basic',
                icon: 'mat_outline:refresh',
                function: () => {
                    this.refresh.next(null);
                },
            },
            {
                title: 'Add Charge',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addCharge();
                },
            },
        ];
    }

    ngOnInit() {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.patientId = Number(this.router.url.split('/')[3]);
        combineLatest([this.activatedRoute.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(PatientChargesActions.LoadCharges({ patientId: this.patientId }));
            });

        // Listen for EditGroupChargeSuccess to refresh the table
        this.actions$
            .pipe(ofType(PatientChargesActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.patientChargesData$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openChargeDetails(params) {
        const isGroupEditOption = this.toolbarData.findIndex(item => item.title === 'Group Edit');
        const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');

        // Clear any existing group edit options
        if (isGroupEditOption !== -1) {
            this.updateToolBarData(isGroupEditOption);
        }

        // Add or update Edit button
        if (isEditOption === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToEdit(params);
                    },
                },
            ];
        }
        this.cdr.detectChanges();
    }

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/charges/add`, params.data.id]);
    }

    onSelectionChanged(params) {
        const isGroupEditOption = this.toolbarData.findIndex(item => item.title === 'Group Edit');
        const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');
        this.selection.setSelection(...params.api.getSelectedRows());

        // Remove Edit button when rows are selected
        if (params.api.getSelectedRows().length > 0) {
            if (isEditOption !== -1) {
                this.updateToolBarData(isEditOption);
            }

            if (isGroupEditOption === -1) {
                this.toolbarData = [
                    ...this.toolbarData,
                    {
                        title: 'Group Edit',
                        type: 'basic',
                        icon: 'mat_outline:edit_note',
                        function: () => {
                            this.openGroupEdit(params);
                        },
                    },
                ];
            }
        } else {
            if (isGroupEditOption > -1) {
                this.updateToolBarData(isGroupEditOption);
                this.selection.clear();
            }
        }
        this.cdr.detectChanges();
    }

    openGroupEdit(params) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Charges Group Edit',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientGroupEditChargeComponent,
            dynamicComponentData: params.api.getSelectedRows().map(res => res.id),
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };

        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '1000px',
            height: 'auto',
            data: popupData,
        });

        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                params.api.clearFocusedCell();
                params.api.deselectAll();
                const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');
                if (isEditOption !== -1) {
                    this.updateToolBarData(isEditOption);
                }
            });
    }

    addCharge() {}
}
