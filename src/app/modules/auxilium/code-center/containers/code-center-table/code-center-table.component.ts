import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { CodeDisplay } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { CodeCenterTableActions } from '../../actions/code-center-table.actions';
import { CodeCenterIndividualFormComponent } from '../../components/code-center-individual-form/code-center-individual-form.component';
import { CodeCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-code-center-table',
    templateUrl: './code-center-table.component.html',
    styleUrls: ['./code-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class CodeCenterTableComponent implements OnInit, AfterViewInit {
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
            headerName: 'ID',
            minWidth: 100,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Code',
            minWidth: 150,
            field: 'code',
            sort: 'asc',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Codetype',
            minWidth: 150,
            field: 'codetype',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 400,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Added By',
            minWidth: 100,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 150,
            field: 'adddate',
            valueFormatter: (params: any) => this.datetimeFormatPipe.transform(params.data.adddate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Effective Date',
            minWidth: 200,
            field: 'effectivedate',
            valueFormatter: (params: any) => this.datetimeFormatPipe.transform(params.data.effectivedate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Expired Date',
            minWidth: 200,
            field: 'expiredate',
            valueFormatter: (params: any) => this.datetimeFormatPipe.transform(params.data.expiredate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Path',
            minWidth: 220,
            field: 'path',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
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

    visibleColumns = ['code', 'codetype', 'description', 'adddate', 'adduserid'];

    loading$ = this.store.select(CodeCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(CodeCenterTableSelectors.selectCodeReps)));
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    selectedRowIndex: number = -1;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dialog: MatDialog,
        private datetimeFormatPipe: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(CodeCenterTableActions.LoadCodes());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(codeRep => {
            this.rowData = codeRep;
        });

        this.actions$
            .pipe(ofType(CodeCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE CODE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: CodeCenterIndividualFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
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
                item.api.clearFocusedCell();
            });
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: CodeDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Code Rep',
            message: 'Are you sure you want to delete this Code rep? This action cannot be undone!',
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
                    this.store.dispatch(CodeCenterTableActions.DeleteCode({ dto }));
                }
            });
    }
}
