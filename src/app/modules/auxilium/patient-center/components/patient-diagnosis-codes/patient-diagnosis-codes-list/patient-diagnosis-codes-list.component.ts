import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { PatientCenterDiagnosiscodesSelectors } from '../../../reducers';
import { NgClass, AsyncPipe } from '@angular/common';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-diagnosis-codes-list',
    templateUrl: './patient-diagnosis-codes-list.component.html',
    styleUrls: ['./patient-diagnosis-codes-list.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        AuxAgGridComponent,
        AsyncPipe,
    ],
})
export class PatientDiagnosisCodesListComponent {
    columnDefs: ColDef[] = [
        { headerName: 'Id', minWidth: 75, field: 'id', hide: false },
        /* { headerName: 'Icd9code', minWidth: 200, field: 'icd9code', filter: 'agMultiColumnFilter', hide: false}, */
        /* { headerName: 'Description', minWidth: 410, field: 'description', filter: 'agMultiColumnFilter', hide: false }, */
        { headerName: 'icd10code', minWidth: 90, field: 'icd10code', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'icd10description',
            minWidth: 500,
            field: 'icd10description',
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        { headerName: 'Status', minWidth: 100, field: 'status', filter: 'agMultiColumnFilter', hide: false },
    ];

    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    searchCtrl = new UntypedFormControl();

    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    displayedColumns: string[] = ['id', 'icd9code', 'description', 'status', 'icd10code', 'icd10description'];
    data$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectdiagnosiscodesListData);
    loading$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectLoading);

    constructor(
        private store: Store,
        private searchService: AuxSearchService,
        private dateAndTimeFormate: DateTimeFormatPipe,
        private cdr: ChangeDetectorRef,
        private _matDialog: MatDialogRef<PatientDiagnosisCodesListComponent>
    ) {
        this.store.dispatch(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesList());
    }
    ngOnInit() {
        Promise.resolve().then(() => {
            this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
                this.rowData = payor;
                this.cdr.detectChanges();
            });
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            this.searchService.search.next(value);
        });
    }

    selectRow(row: any) {
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
