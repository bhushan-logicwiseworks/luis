import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { IdentityDisplay } from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { IdentityCenterTableActions } from '../../actions/identity-center-table.actions';
import { IdentityCenterIndividualComponent } from '../../components/identity-center-individual/identity-center-individual.component';
import { IdentityCenterTableSelectors } from '../../reducers';
import { SearchService } from '../../services/search.service';

@UntilDestroy()
@Component({
    selector: 'ac-identity-center-table',
    templateUrl: './identity-center-table.component.html',
    styleUrls: ['./identity-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class IdentityCenterTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'UID', field: 'uid', filter: 'agMultiColumnFilter', minWidth: 300 },
        { headerName: 'Email', field: 'email', filter: 'agMultiColumnFilter', minWidth: 300 },
        {
            headerName: 'Email Verified',
            field: 'emailVerified',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'emailVerified' },
            minWidth: 160,
        },
        {
            headerName: 'Created',
            field: 'created',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.created),
            minWidth: 200,
        },
        {
            headerName: 'Last Signin',
            field: 'lastSignIn',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.lastSignIn),
            minWidth: 200,
        },
        { headerName: 'displayName', field: 'displayName', filter: 'agMultiColumnFilter', minWidth: 240 },
        {
            headerName: 'Actions',
            minWidth: 101,
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

    visibleColumns = ['uid', 'email', 'emailVerified', 'created', 'lastSignIn', 'displayName', 'actions'];

    loading$ = this.store.select(IdentityCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(IdentityCenterTableSelectors.selectUsers))
    );

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private cd: ChangeDetectorRef,
        private dateTimeFormate: DateTimeFormatPipe,
        private actions$: Actions,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(IdentityCenterTableActions.LoadUsers({ filter: 'ACTIVE' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });

        this.actions$
            .pipe(ofType(IdentityCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(IdentityCenterTableActions.ResetState());
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'USER DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: IdentityCenterIndividualComponent,
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

    /**
     * Delete the contact
     */
    deleteContact(dto: IdentityDisplay) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Permanently',
            message: 'Are you sure you want to delete this access? This action cannot be undone!',
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
                    this.store.dispatch(IdentityCenterTableActions.DeleteUser({ dto }));
                }
            });
    }

    selectionRow(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
