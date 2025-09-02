import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { PatientCenterPhysiciansSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-patient-physician-list',
    templateUrl: './patient-physician-list.component.html',
    styleUrls: ['./patient-physician-list.component.scss'],
    standalone: true,
    imports: [NgClass, AuxAgGridComponent, AsyncPipe],
    providers: [PhoneNumberPipe],
})
export class PatientPhysicianListComponent {
    rowData = [];

    paginationOption = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    data$ = this.store.select(PatientCenterPhysiciansSelectors.selectPhysiciansList);
    loading$ = this.store.select(PatientCenterPhysiciansSelectors.selectLoading);

    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            width: 105,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Phy Key',
            width: 125,
            field: 'phykey',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'NPI',
            width: 125,
            field: 'npi',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Last Name',
            width: 200,
            field: 'lastname',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'First Name',
            width: 200,
            field: 'firstname',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            width: 150,
            field: 'phone',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Taxonomy',
            width: 190,
            field: 'taxonomy',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'UPIN',
            width: 190,
            field: 'upin',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
    ];

    displayedColumns: string[] = [
        'id',
        'phykey',
        'npi',
        'lastname',
        'firstname',
        'phone',
        'address1',
        'phone',
        'taxonomy',
        'upin',
    ];

    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private _matDialog: MatDialogRef<PatientPhysicianListComponent>,
        private searchService: AuxSearchService,
        private phoneNumberPipe: PhoneNumberPipe
    ) {}

    ngOnInit() {
        Promise.resolve().then(() => {
            this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysiciansList());
            this.data$.pipe(untilDestroyed(this)).subscribe(physicians => {
                if (physicians) {
                    this.rowData = physicians;
                    this.cdr.detectChanges();
                }
            });
        });
    }

    selectRow(row: any) {
        this._matDialog.close(row);
        this.clearFilter();
    }
    ngAfterViewInit() {}
    onSelectionChanged(params) {
        this.selectRow(params.api.getSelectedRows()[0]);
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
