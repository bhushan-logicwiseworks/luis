import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef, RowNode } from 'ag-grid-enterprise';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { PatientCenterPhysiciansSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { PatientPhysicianAddComponent } from '../patient-physician-add/patient-physician-add.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-physicians-table',
    templateUrl: './patient-physicians-table.component.html',
    styleUrls: ['./patient-physicians-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientPhysiciansTableComponent {
    title: string;

    rowData = [];
    rowUpdateOrderData: PatientPhysicianAdd[];

    options = {
        gridOptions: {
            rowDragManaged: true,
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
            headerName: 'Id',
            minWidth: 60,
            field: 'id',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Dr Id',
            cellRenderer: 'agGroupCellRenderer',
            cellClass: 'custom',
            cellRendererParams: {
                innerRenderer: function (params) {
                    return `<div class="flex items-start"><span class="mr-1"><i class="material-icons">drag_handle</i></span>${params.value}</div>`;
                },
            },
            rowDrag: true,
            minWidth: 80,
            field: 'doctorId',
            sortIndex: 2,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Order',
            minWidth: 70,
            field: 'order',
            sortIndex: 6,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Phy Key',
            minWidth: 100,
            field: 'phykey',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'First Name',
            minWidth: 150,
            field: 'firstName',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Last Name',
            minWidth: 150,
            field: 'lastName',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'NPI',
            minWidth: 150,
            field: 'npi',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Fax',
            minWidth: 150,
            field: 'fax',
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.fax),
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Pecos',
            minWidth: 70,
            field: 'pecos',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'State',
            minWidth: 70,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Zip',
            minWidth: 75,
            field: 'zip',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Is Active',
            minWidth: 100,
            field: 'isActive',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openPhysicians(params),
        },
        {
            headerName: 'Actions',
            minWidth: 150,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Edit Physician',
                        action: this.navigatePhysicianDetails.bind(this),
                        icon: 'mat_outline:edit_note',
                        color: 'text-green-500',
                    },
                    {
                        name: 'Remove Physician',
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

    data$ = this.store.select(PatientCenterPhysiciansSelectors.selectPhysicians);
    loading$ = this.store.select(PatientCenterPhysiciansSelectors.selectLoading);
    toolbarData: FuseNavigationItem[];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    visibleColumns: string[] = [
        'doctorId',
        'firstName',
        'lastName',
        'npi',
        'phone',
        'fax',
        'pecos',
        'state',
        'zip',
        'order',
        'actions',
    ];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    constructor(
        private store: Store,
        private router: Router,
        private titleService: TitleService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private route: ActivatedRoute,
        private auxUtilService: AuxUtilService,
        private actions$: Actions,
        private phoneNumberPipe: PhoneNumberPipe
    ) {
        this.toolbarData = [
            {
                title: 'Assign Physician',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.save();
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
            {
                title: 'View Payors',
                type: 'basic',
                icon: 'mat_outline:money',
                function: () => {
                    this.viewPayors();
                },
            },
        ];
    }
    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: id }));

        this.data$.pipe(untilDestroyed(this)).subscribe(physician => {
            this.rowData = physician;
        });

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: +paramMap.get('id') }));
            });

        this.actions$.pipe(ofType(PatientCenterPhysiciansActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    delete(delData) {
        this.deletePayors(delData.data);
    }

    navigatePhysicianDetails(phyData) {
        this.router.navigateByUrl(`/centers/physician-center/${phyData.data.doctorId}/demographics`);
    }

    /**
     * Delete the Payors
     */
    deletePayors(data): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Physician',
            message: 'Are you sure you want to Remove this physician? This action cannot be undone!',
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
                    const dto = {
                        id: data.id,
                    };
                    this.store.dispatch(PatientCenterPhysiciansActions.DeletePatientPhysicians({ dto }));
                }
            });
    }

    openPhysicians(data) {
        // const id = Number(this.router.url.split('/')[3]);
        // const popupData: PopupData = {
        //     icon: 'mat_outline:assignment',
        //     iconColor:'primary',
        //     title: 'ADD PHYSICIAN:' + ' ' + id,
        //     titleColor:'text-secondary',
        //     cancelButtonText: 'Cancel',
        //     saveButtonText: 'Save',
        //     dynamicComponent: PatientPhysicianEditComponent,
        //     dynamicComponentData:  data.api.getSelectedRows()[0] || null,
        //     submitFunction: 'save',
        //     enterKeyEnabled: true,
        // };
        // this._matDialog
        //     .open(AuxPopupComponent, {
        //         width: '800px',
        //         maxWidth: '100%',
        //         panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
        //         position: {
        //             top: 0 + 'px',
        //             right: 0 + 'px',
        //         },
        //         height: '100vh',
        //         data: popupData,
        //     })
        //     .afterClosed()
        //     .pipe(untilDestroyed(this))
        //     .subscribe((result) => {
        //     // this.refresh.next(result)
        //     data.api.clearFocusedCell()
        //     })
    }

    save() {
        const id = this.router.url.split('/')[3];
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add Physician:' + id,
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add Physician',
            dynamicComponent: PatientPhysicianAddComponent, // Component you want to load dynamically
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

    onRowDragEnd(e) {
        const getDataInDragOrder = e?.node?.parent?.childrenAfterFilter as RowNode[];
        const columnsOrder = getDataInDragOrder.map((res: RowNode) => res.data);

        // Update order numbers
        const physicians = columnsOrder.map((physician, i) => {
            const updatedPhysician = {
                ...physician,
                order: i + 1,
                addUserId: '', // Assuming addUserId is not needed for update
            };
            return this.auxUtilService.transFormValuesToUpperCase(updatedPhysician, ['type']);
        });

        // Save changes immediately instead of storing in rowUpdateOrderData
        this.store.dispatch(PatientCenterPhysiciansActions.UpdatePatientPhysicians({ physicians }));
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

    viewPayors() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Payors',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientPayorsListDrawerComponent,
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
}
