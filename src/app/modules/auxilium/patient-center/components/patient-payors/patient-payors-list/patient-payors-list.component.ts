import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { Payor } from '../../../../../../shared/interfaces/auxilium/payor-center/payor.interface';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-patient-payors-list',
    templateUrl: './patient-payors-list.component.html',
    styleUrls: ['./patient-payors-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, AuxAgGridComponent, AsyncPipe],
})
export class PatientPayorsListComponent implements OnInit {
    selectedItem!: Payor;
    rowData = [];
    columnDefs: ColDef[] = [
        {
            headerName: 'Payor ID',
            minWidth: 85,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Bill-To Code',
            minWidth: 125,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Branch',
            minWidth: 100,
            field: 'branchName',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Name',
            minWidth: 350,
            field: 'name',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Address',
            minWidth: 200,
            field: 'address',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'City',
            minWidth: 120,
            field: 'city',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'State',
            minWidth: 100,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'NPI',
            minWidth: 100,
            field: 'npi',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
    ];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    displayedColumns: string[] = ['id', 'billto', 'branchName', 'name', 'city', 'state', 'npi'];

    searchCtrl = new UntypedFormControl();
    data$ = this.store.select(PatientCenterPayorsSelectors.selectPayorsList);
    loading$ = this.store.select(PatientCenterPayorsSelectors.selectLoading);
    getPatientId: number;
    constructor(
        private store: Store,
        private route: Router,
        private searchService: AuxSearchService,
        private _matDialog: MatDialogRef<any>,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        Promise.resolve().then(() => {
            this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
                this.rowData = payor;
            });
            this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayorsList());
            this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
                this.searchService.search.next(value);
                this.cdr.detectChanges();
            });
            this.getPatientId = Number(this.route.url.split('/')[3]);
        });
    }

    close() {
        this._matDialog.close();
    }

    selectRow(row) {
        this._matDialog.close(row);
        this.clearFilter();
    }

    onSelectionChanged(params) {
        this.selectRow(params.api.getSelectedRows()[0]);
    }
    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
