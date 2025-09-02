import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { FuseConfirmationService } from '../../../../../../@fuse/services/confirmation/confirmation.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PhoneCellRendererComponent } from '../../../../../shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { CompanyDisplay } from '../../../../../shared/interfaces/auxilium/company-center/company.interface';
import { CompanyCenterTableActions } from '../../actions/company-center-table.actions';
import { CompanyCenterTableSelectors } from '../../reducers';
import { SearchService } from '../../services/search.service';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-company-center-table',
    templateUrl: './company-center-table.component.html',
    styleUrls: ['./company-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class CompanyCenterTableComponent {
    visibleColumns = ['id', 'name', 'city', 'state', 'address', 'phone', 'fax'];
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', filter: 'agMultiColumnFilter', minWidth: 100, hide: false },
        { headerName: 'Name', field: 'name', filter: 'agMultiColumnFilter', hide: false, minWidth: 326 },
        { headerName: 'City', field: 'city', filter: 'agMultiColumnFilter', hide: false, minWidth: 120 },
        { headerName: 'State', field: 'state', filter: 'agMultiColumnFilter', hide: false, minWidth: 150 },
        { headerName: 'Address', field: 'address', filter: 'agMultiColumnFilter', hide: false, minWidth: 110 },
        {
            headerName: 'Phone',
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            filter: 'agMultiColumnFilter',
            hide: false,
            minWidth: 150,
            valueFormatter: params => this.phoneNumberPipe.transform(params.data.phone),
        },
        {
            headerName: 'Fax',
            field: 'fax',
            filter: 'agMultiColumnFilter',
            hide: false,
            minWidth: 150,
            valueFormatter: params => this.phoneNumberPipe.transform(params.data.phone),
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
    loading$ = this.store.select(CompanyCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(CompanyCenterTableSelectors.selectCompany))
    );
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private cd: ChangeDetectorRef,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormate: DateTimeFormatPipe,
        private phoneNumberPipe: PhoneNumberPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    selection = new SelectionModel<CompanyDisplay>(true, []);
    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(CompanyCenterTableActions.LoadCompany());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(branchRep => {
            this.rowData = branchRep;
        });
        this.actions$
            .pipe(ofType(CompanyCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }
    deleteRow(params) {
        // this.deleteContact(params.data);
    }

    openItem(CompanyDisplay) {
        this.router.navigateByUrl(`/centers/company-center/${CompanyDisplay.id}/demographics`);
    }

    selectionChange(params) {
        const excludedColumns = ['actions', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }
}
