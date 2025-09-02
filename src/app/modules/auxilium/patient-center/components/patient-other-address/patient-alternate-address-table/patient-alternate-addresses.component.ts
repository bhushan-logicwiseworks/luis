import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientAlternateAddressActions } from '../../../actions/patient-alternate-address.action';
import { PatientOtherAddressSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { PatientAlternateAddressFormComponent } from '../patient-alternate-address-form/patient-alternate-address-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-alternate-address',
    templateUrl: './patient-alternate-addresses.component.html',
    styleUrls: ['./patient-alternate-addresses.component.scss'],
    providers: [DateFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientAlternateAddressesComponent implements OnInit, AfterViewInit {
    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'Address Type',
            minWidth: 150,
            field: 'addresstype',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Id',
            minWidth: 105,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Entity Type',
            minWidth: 105,
            field: 'entitytype',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 157,
            field: 'firstname',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 148,
            field: 'lastname',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Address',
            minWidth: 290,
            field: 'address',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'City',
            minWidth: 113,
            field: 'city',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'State',
            minWidth: 118,
            field: 'state',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Zip',
            minWidth: 108,
            field: 'zip',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Relationship',
            minWidth: 164,
            field: 'relationship',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Email',
            minWidth: 105,
            field: 'email',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Expire Date',
            minWidth: 159,
            field: 'expiredate',
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            valueFormatter: (params: any) => this.date.transform(params.data.expiredate),
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Add Date',
            minWidth: 176,
            field: 'adddate',
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            valueFormatter: (params: any) => this.dateTime.transform(params.data.adddate),
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'AddUser Id',
            minWidth: 105,
            field: 'adduserid',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            filter: false,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Altenate Address',
                        action: this.deleteData.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            hide: false,
            minWidth: 101,
        },
    ];

    toolbarData: FuseNavigationItem[];
    title: string;
    data$ = this.store.select(PatientOtherAddressSelectors.selectAddress);
    loading$ = this.store.select(PatientOtherAddressSelectors.selectLoading);
    otherAddress: PatientOtherAddress[];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    visibleColumns: string[] = [
        'addresstype',
        'firstname',
        'lastname',
        'address',
        'city',
        'state',
        'zip',
        'relationship',
        'expiredate',
        'actions',
    ];
    searchCtrl = new UntypedFormControl();

    selectedRowIndex: number = -1;

    paginationOption = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private dialog: MatDialog,
        private titleService: TitleService,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dateTime: DateTimeFormatPipe,
        private date: DateFormatPipe,
        private store: Store
    ) {
        this.toolbarData = [
            {
                title: 'Add Alternate Address',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.saveContact();
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

    selection = new SelectionModel<PatientOtherAddress>(true, []);

    ngOnInit(): void {
        // Set Title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(
                    PatientAlternateAddressActions.LoadAlternateAddress({ patientId: +paramMap.get('id') })
                );
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(otherAddress => {
            this.otherAddress = otherAddress;
            this.rowData = otherAddress;
        });

        this.actions$.pipe(ofType(PatientAlternateAddressActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    setValue() {
        this.titleService.setValue(this.title);
    }

    ngAfterViewInit(): void {}

    openAlternateAddress(address) {
        this.selection.clear();
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE ALTERNATE ADDRESS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAlternateAddressFormComponent,
            dynamicComponentData: address.api.getSelectedRows()[0] || null,
            submitFunction: 'saveContact',
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
                address.api.clearFocusedCell();
            });
    }

    deleteData(param) {
        this.deleteContact(param.data);
    }
    /**
     * Delete the contact
     */
    deleteContact(address: PatientOtherAddress): void {
        //console.log(address,"this is a data")

        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete contact',
            message: 'Are you sure you want to delete this contact? This action cannot be undone!',
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
                    // Get the current contact's id
                    // const id: number = item.id;

                    // Delete the contact
                    this.store.dispatch(PatientAlternateAddressActions.DeleteAlternateAddress({ address }));
                }
            });
    }

    saveContact() {
        // this.dialog.open(PatientAlternateAddressAddComponent, {
        //     data: null,
        //     width: '800px',
        //     maxWidth: '100%',
        //     panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
        //     position: {
        //         top: 0 + 'px',
        //         right: 0 + 'px',
        //     },
        //     height: '100vh'
        // });

        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'ADD ALTERNATE ADDRESS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAlternateAddressFormComponent,
            dynamicComponentData: null,
            submitFunction: 'saveContact',
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

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openAlternateAddress(params);
        }
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
        this.dialog
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
        this.dialog
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
