import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { PatientPortalUserDisplay } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientPortalIndividualActions } from '../../actions/patient-portal-individual.actions';
import { PatientPortalTableActions } from '../../actions/patient-portal-table.actions';
import { PatientPortalIndividualComponent } from '../../components/patient-portal-individual/patient-portal-individual.component';
import { PatientPortalTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-patient-portal-table',
    templateUrl: './patient-portal-table.component.html',
    styleUrls: ['./patient-portal-table.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientPortalTableComponent implements OnInit, AfterViewInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 50, field: 'id', onCellClicked: params => this.openItem(params) },
        {
            headerName: 'Pat Id',
            minWidth: 70,
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'Registered Email',
            minWidth: 300,
            field: 'registeredEmail',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'GUID',
            minWidth: 300,
            field: 'guid',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'User Email',
            minWidth: 220,
            field: 'userEmail',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Email Confirmed',
            minWidth: 70,
            field: 'isEmailConfirmed',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'isEmailConfirmed' },
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Electronic Consent',
            minWidth: 70,
            field: 'isElectronicConsent',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'isElectronicConsent' },
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Consent Date',
            minWidth: 150,
            field: 'electronicConsentDate',
            filter: 'agMultiColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.electronicConsentDate),
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Created By',
            minWidth: 150,
            field: 'createdBy',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Created Date',
            minWidth: 175,
            field: 'createdDate',
            filter: 'agMultiColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.createdDate),
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'Actions',
            minWidth: 100,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Delete Permanently',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 10,
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
        'patientId',
        'registeredEmail',
        'guid',
        'isEmailConfirmed',
        'isElectronicConsent',
        'electronicConsentDate',
        'createdDate',
        'actions',
    ];

    loading$ = this.store.select(PatientPortalTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(PatientPortalTableSelectors.selectUsers)));
    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimeFormate: DateTimeFormatPipe,
        private actions$: Actions,
        private dialog: MatDialog,
        private auxUtilService: AuxUtilService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(PatientPortalTableActions.LoadPPUsers({ filter: 'ALL' }));
                        break;

                    case 'confirmed':
                        this.store.dispatch(PatientPortalTableActions.LoadPPUsers({ filter: 'CONFIRMED' }));
                        break;

                    case 'unconfirmed':
                        this.store.dispatch(PatientPortalTableActions.LoadPPUsers({ filter: 'UNCONFIRMED' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(users => {
            this.rowData = users;
        });

        this.actions$.pipe(ofType(PatientPortalTableActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    deleteRow(params) {
        this.delete(params.data);
    }

    ngAfterViewInit() {}

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(PatientPortalTableActions.ResetState());
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'EDIT USER DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientPortalIndividualComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'updateUserDetails',
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
                if (result) {
                    this.store.dispatch(PatientPortalIndividualActions.UpdateUserDetails({ userDetails: result }));
                    item.api.clearFocusedCell();
                }
                if (!result) {
                    this.refresh.next(result);
                    item.api.clearFocusedCell();
                }
            });
    }

    delete(dto: PatientPortalUserDisplay) {
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
                    // Delete the contact
                    this.store.dispatch(PatientPortalTableActions.DeletePPUser({ dto }));
                }
            });
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
