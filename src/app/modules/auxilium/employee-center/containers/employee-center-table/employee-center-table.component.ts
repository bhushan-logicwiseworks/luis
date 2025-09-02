import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { EmployeeCenterTableActions } from '../../actions/employee-center-table.actions';
import { EmployeeCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-employee-center-table',
    templateUrl: './employee-center-table.component.html',
    styleUrls: ['./employee-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class EmployeeCenterTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 100, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'User Name', field: 'userName', minWidth: 150, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Last Name', field: 'lastName', minWidth: 125, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'First Name', field: 'firstName', minWidth: 125, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Address', field: 'address', minWidth: 200, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Address 2', field: 'address2', minWidth: 200, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'City', field: 'city', minWidth: 150, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'State', field: 'state', minWidth: 100, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Zip', field: 'zip', minWidth: 100, filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Cell',
            field: 'cell',
            minWidth: 125,
            filter: 'agMultiColumnFilter',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
            valueFormatter: params => this.phoneNumber.transform(params.data.cell),
            hide: false,
        },
        {
            headerName: 'Phone',
            field: 'phone',
            minWidth: 150,
            filter: 'agMultiColumnFilter',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: params => this.phoneNumber.transform(params.data.phone),
            hide: false,
        },
        {
            headerName: 'Fax',
            field: 'fax',
            minWidth: 150,
            filter: 'agMultiColumnFilter',
            valueFormatter: params => this.phoneNumber.transform(params.data.fax),
            hide: false,
        },
        { headerName: 'Email', field: 'email', minWidth: 250, filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Is Active',
            field: 'isactive',
            minWidth: 50,
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'isactive' },
            hide: false,
        },
        {
            headerName: 'Created Date',
            field: 'addeddate',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.addeddate),
            hide: false,
        },
        { headerName: 'Added By', field: 'addedby', minWidth: 150, filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Modified Date',
            field: 'modifieddate',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.modifieddate),
            hide: false,
        },
        { headerName: 'Modified By', field: 'modifiedby', minWidth: 150, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Modified By', field: 'modifiedby', minWidth: 150, filter: 'agMultiColumnFilter', hide: false },
        // {
        //     headerName: 'Actions', minWidth: 75, field: 'actions', cellRenderer: ActionsRedererComponent, cellRendererParams: {
        //         menuItems: [
        //             /* { name: 'Delete Permanently', action: this.deleteRow.bind(this), icon: "mat_outline:delete" }, */
        //             { name: 'Edit Employee', action: this.edit.bind(this), icon: "mat_outline:account_tree" }
        //         ]
        //     }, filter: false, sortIndex: 13,hide: false ,sortable: false
        // },
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
        'id',
        'userName',
        'lastName',
        'firstName',
        'state',
        'cell',
        'email',
        'modifieddate',
        'modifiedby',
        'actions',
    ];

    loading$ = this.store.select(EmployeeCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(EmployeeCenterTableSelectors.selectEmployees))
    );

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormate: DateTimeFormatPipe,
        private phoneNumber: PhoneNumberPipe,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                const filterSlug = this.route.snapshot.routeConfig.path;
                this.store.dispatch(EmployeeCenterTableActions.LoadEmployees({ filter: filterSlug }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(employee => {
            this.rowData = employee;
        });

        this.actions$
            .pipe(ofType(EmployeeCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    // edit(params){
    //     this.openEmployee(params)
    // }

    ngOnDestroy() {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(EmployeeCenterTableActions.ResetState());
    }

    openItem(employee: any) {
        //console.log("open employee", employee);
        this.router.navigateByUrl(`/centers/employee-center/${employee.id}`);
    }

    // openEmployee(rep) {
    //     const modalRef = this.dialog.open(EmployeeCenterIndividualComponent, {
    //         data: rep.data || null,
    //         width: '800px',
    //         maxWidth: '100%',
    //         panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
    //         position: {
    //             top: 0 + 'px',
    //             right: 0 + 'px',
    //         },
    //         height: '100vh'
    //     })
    //     modalRef.afterClosed().pipe(
    //         untilDestroyed(this)
    //     ).subscribe(result => {
    //         this.refresh.next(result)
    //         rep.api.clearFocusedCell()
    //     })
    //     modalRef.beforeClosed().pipe(
    //         untilDestroyed(this)
    //     ).subscribe((value) => this.refresh.next(value));
    // }

    /**
     * Delete the contact
     */
    deleteContact(dto: EmployeeDisplay): void {
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
                    this.store.dispatch(EmployeeCenterTableActions.DeleteEmployee({ dto }));
                }
            });
    }

    selectionChange(params) {
        const excludedColumns = ['actions', 'cell', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }
}
