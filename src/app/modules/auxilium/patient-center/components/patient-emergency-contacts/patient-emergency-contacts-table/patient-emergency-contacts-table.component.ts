import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { EmergencyContactsActions } from 'app/modules/auxilium/patient-center/actions/patient-emergency-contacts.action';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { PatientEmergencyContact } from 'app/shared/interfaces/auxilium/patient-center/patient-emergency-contacts.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { EmergencyContactsSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { PatientEmergencyContactFormComponent } from '../components/patient-emergency-contact-form/patient-emergency-contact-form.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-emergency-contacts-table',
    templateUrl: './patient-emergency-contacts-table.component.html',
    styleUrls: ['./patient-emergency-contacts-table.component.scss'],
    providers: [
        DateTimeFormatPipe,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientEmergencyContactsTableComponent {
    title: string;
    rowData = [];
    toolbarData: FuseNavigationItem[];

    columnDefs: ColDef[] = [
        { headerName: 'Id', minWidth: 100, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        { headerName: 'Rank', minWidth: 100, field: 'rank', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Is Emergency',
            minWidth: 150,
            field: 'isEmergency',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Relationship',
            minWidth: 225,
            field: 'relationship',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 150,
            field: 'firstname',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 150,
            field: 'lastname',
            filter: 'agDateColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Address',
            minWidth: 123,
            field: 'address',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        { headerName: 'City', minWidth: 123, field: 'city', filter: 'agMultiColumnFilter', sortIndex: 7, hide: false },
        {
            headerName: 'State',
            minWidth: 123,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        { headerName: 'Zip', minWidth: 123, field: 'zip', filter: 'agMultiColumnFilter', sortIndex: 9, hide: false },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Cell',
            minWidth: 175,
            field: 'cell',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
        },
        {
            headerName: 'Email',
            minWidth: 123,
            field: 'email',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 150,
            field: 'addeddate',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.addeddate),
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 75,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Additional Contact',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 14,
            hide: false,
            sortable: false,
        },
    ];

    visibleColumns = [
        'rank',
        'isEmergency',
        'relationship',
        'firstname',
        'lastname',
        'city',
        'state',
        'zip',
        'cell',
        'actions',
    ];

    emergencyContacts$ = this.store.select(EmergencyContactsSelectors.selectEmergencyContacts);
    loading$ = this.store.select(EmergencyContactsSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    constructor(
        private store: Store,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private dateTime: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService,
        private phoneNumberPipe: PhoneNumberPipe,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Add Emergency Contact',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addEmergencyContact();
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

        const patientId = Number(this.router.url.split('/')[3]);

        combineLatest([this.activatedRoute.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(EmergencyContactsActions.LoadEmergencyContacts({ patientId }));
            });
        this.emergencyContacts$.pipe(untilDestroyed(this)).subscribe(access => {
            this.rowData = access;
        });

        this.actions$
            .pipe(ofType(EmergencyContactsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteEmergencyContact(params.data);
    }

    /**
     * Delete the EmergencyContact
     */
    deleteEmergencyContact(emergencyContact: PatientEmergencyContact): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Contact',
            message: 'Are you sure you want to delete this Emergency Contact? This action cannot be undone!',
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
                    const payload = {
                        ...emergencyContact,
                        isactive: false,
                    };

                    // Delete the Contact
                    this.store.dispatch(EmergencyContactsActions.DeleteEmergencyContact({ emergencyContact: payload }));
                }
            });
    }

    onSelectionChanged(params) {
        const excludedColumns = ['actions', 'cell', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params);
        }
    }

    addEmergencyContact() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'ADD EMERGENCY CONTACT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientEmergencyContactFormComponent,
            dynamicComponentData: null,
            submitFunction: 'saveEmergencyContact',
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

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE EMERGENCY CONTACT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientEmergencyContactFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'saveEmergencyContact',
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
