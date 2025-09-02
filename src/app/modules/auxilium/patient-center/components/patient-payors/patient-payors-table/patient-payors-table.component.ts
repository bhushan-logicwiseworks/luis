import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GridReadyEvent } from 'ag-grid-community';
import { CellClassParams, ColDef, GridApi, RowNode } from 'ag-grid-enterprise';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { PayorRank } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-update-rank.interface';
import { PatientPayors } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsAddComponent } from '../patient-payors-add/patient-payors-add.component';
import { PatientPayorsEditComponent } from '../patient-payors-edit/patient-payors-edit.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-payors-table',
    templateUrl: './patient-payors-table.component.html',
    styleUrls: ['./patient-payors-table.component.scss'],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientPayorsTableComponent implements OnInit, AfterViewInit {
    rowUpdateRankData;
    isAction = false;
    patientId: number;
    private gridApi: GridApi;
    // private gridColumnApi: ColumnApi;
    toolbarData: FuseNavigationItem[];
    title: string;
    data$ = this.store.select(PatientCenterPayorsSelectors.selectPayors);
    loading$ = this.store.select(PatientCenterPayorsSelectors.selectLoading);

    visibleColumns: string[] = [
        'rank',
        'id',
        'payorId',
        'billTo',
        'name',
        'policy',
        'deductibleAmount',
        'copayAmount',
        'phone',
        'city',
        'state',
        'actions',
    ];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    rowData = [];

    options = {
        gridOptions: {
            rowDragManaged: false,
            rowDragEntireRow: true,
            rowDragMultiRow: true,
            rowSelection: 'multiple',
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'Rank',
            cellRenderer: 'agGroupCellRenderer',
            cellClass: 'custom',
            cellStyle: (params: CellClassParams<any>) =>
                params.data.rank == 9 ? { 'pointer-events': 'none', opacity: '0.4' } : null,
            cellRendererParams: {
                innerRenderer: function (params) {
                    return `<div class="flex items-start"><span class="mr-1"><i class="material-icons">drag_handle</i></span>${params.value}</div>`;
                },
            },
            minWidth: 70,
            field: 'rank',
            sortIndex: 2,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Id',
            minWidth: 70,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Payor Id',
            minWidth: 85,
            field: 'payorId',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Payor',
            minWidth: 130,
            field: 'billTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Name',
            minWidth: 275,
            field: 'name',
            filter: 'agTextColumnFilter',
            sortIndex: 4,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Policy',
            minWidth: 135,
            field: 'policy',
            filter: 'agTextColumnFilter',
            cellClass: params => {
                if (params.data.policy === '') {
                    return 'bg-red-400';
                }
            },
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Deductible',
            minWidth: 95,
            field: 'deductibleAmount',
            valueFormatter: (params: any) => this.currancy.transform(params.data.deductibleAmount, 'USD', 'symbol'),
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Copay',
            minWidth: 90,
            field: 'copayAmount',
            valueFormatter: (params: any) => this.currancy.transform(params.data.copayAmount, 'USD', 'symbol'),
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phonenumber.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Address',
            minWidth: 160,
            field: 'address',
            filter: 'agTextColumnFilter',
            sortIndex: 9,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'City',
            minWidth: 115,
            field: 'city',
            filter: 'agTextColumnFilter',
            sortIndex: 10,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'State',
            minWidth: 70,
            field: 'state',
            filter: 'agTextColumnFilter',
            sortIndex: 11,
            hide: false,
            onCellClicked: params => this.openPayors(params),
        },
        {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    /* { name: 'Edit Payor', action: this.navigatePayorDetails.bind(this), icon: "mat_outline:edit_note", color: 'text-green-500' } , */
                    {
                        name: 'Remove Payor',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            sortIndex: 1,
            hide: false,
        },
    ];

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store,
        private actions$: Actions,
        private _matDialog: MatDialog,
        private currancy: CurrencyPipe,
        private phonenumber: PhoneNumberPipe,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Assign Payor',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.assignPayor();
                },
            },
            {
                title: 'View Contact Notes',
                type: 'basic',
                icon: 'mat_outline:speaker_notes',
                function: () => {
                    this.viewPatientNotes();
                },
            },
        ];
    }
    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.patientId = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayors({ id: this.patientId }));

        this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
            this.rowData = payor;
        });

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayors({ id: +paramMap.get('id') }));
            });

        this.actions$.pipe(ofType(PatientCenterPayorsActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    assignPayor() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add Payor for patient # ' + this.patientId,
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add Payor',
            dynamicComponent: PatientPayorsAddComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'save',
            enterKeyEnabled: true,
        };
        const dialogRef = this._matDialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
    }

    delete(delData) {
        this.deletePayors(delData.data);
    }

    /**
     * Delete the Payors
     */
    deletePayors(dto: PatientPayors): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Payor',
            message: 'Are you sure you want to Remove this Payor? This action cannot be undone!',
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
                    this.store.dispatch(PatientCenterPayorsActions.DeletePatientPayor({ dto }));
                }
            });
    }

    openPayors(data) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'UPDATE PAYOR DETAIL',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientPayorsEditComponent,
            dynamicComponentData: data.api.getSelectedRows()[0] || null,
            submitFunction: 'update',
            enterKeyEnabled: true,
        };
        this._matDialog
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
                this.refresh.next(null);
                data.api.clearFocusedCell();
            });
    }

    navigatePayorDetails(phyData) {
        this.router.navigateByUrl(`/centers/payor-center/${phyData.data.payorId}/demographics`);
    }

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientContactNotesDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this._matDialog
            .open(AuxPopupComponent, {
                width: '650px',
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
            .subscribe(result => {});
    }

    onRowDragEnd(e) {
        this.rowUpdateRankData = [];
        const tempData = e?.nodes.map((node: RowNode) => node.data);
        if (tempData[0].rank === 9) {
            return;
        }
        const getDataInDragOrder = e?.node?.parent?.childrenAfterFilter as RowNode[];
        this.rowUpdateRankData = getDataInDragOrder.map((node: RowNode) => node.data);
        this.updatePayorsRank();
    }

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }

    // updateToolBarData() {
    //     const updateOrderExists = this.toolbarData.some(item => item.title === 'Update Rank');
    //     if (this.rowUpdateRankData.length !== 0 && !updateOrderExists) {
    //         this.toolbarData = [
    //          ...this.toolbarData,
    //             {
    //                 title: 'Update Rank',
    //                 type: 'basic',
    //                 icon: 'heroicons_outline:refresh',
    //                 function: () => {
    //                     this.updatePayorsRank()
    //                 }
    //             }];
    //     } else if (this.rowUpdateRankData.length === 0 && updateOrderExists) {
    //         this.removeUpdateRankFromToolbar();
    //     }
    // }

    // removeUpdateRankFromToolbar() {
    //     this.toolbarData = this.toolbarData.filter(item => item.title !== 'Update Rank');
    // }

    updatePayorsRank() {
        const payors: PayorRank[] = this.rowUpdateRankData.map(payor => ({
            patientId: this.patientId,
            payorId: payor.payorId,
            rank: payor.rank,
            id: payor.id,
        }));
        this.store.dispatch(PatientCenterPayorsActions.UpdatePatientPayors({ payors: { payorRanks: payors } }));
        this.rowUpdateRankData = [];
    }
}
