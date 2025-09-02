import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { PatientDiagnosisCodes } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';
import { Subject } from 'rxjs';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { PatientCenterDiagnosiscodesSelectors } from '../../../reducers';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-patient-diagnosis-assign-codes-list',
    templateUrl: './patient-diagnosis-assign-codes-list.component.html',
    styleUrls: ['./patient-diagnosis-assign-codes-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientDiagnosisAssignCodesListComponent {
    data$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectdiagnosiscodesList);
    loading$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectLoading);
    rowData = [];
    selectedDiagnosisCode: PatientDiagnosisCodes;
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
    columnDefs: ColDef[] = [
        {
            headerName: 'id',
            minWidth: 101,
            field: 'id',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.selectCode(params),
        },
        {
            headerName: 'icd10code',
            minWidth: 101,
            field: 'icd10code',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.selectCode(params),
        },
        {
            headerName: 'Description',
            minWidth: 500,
            field: 'description',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.selectCode(params),
        },
        {
            headerName: 'icdcodeId',
            minWidth: 101,
            field: 'icdcodeId',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.selectCode(params),
        },
        {
            headerName: 'Order',
            minWidth: 101,
            field: 'order',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.selectCode(params),
        },
    ];

    visibleColumns: string[] = ['id', 'icd10code', 'description'];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private router: Router,
        private actions$: Actions,
        private _matDialogRef: MatDialogRef<PatientDiagnosisAssignCodesListComponent>,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        Promise.resolve().then(() => {
            let id = this.router.url.split('/')[3];
            if (id === 'edit') {
                let id = Number(this.router.url.split('/')[4]);
                if (!Number.isNaN(id)) {
                    this.store.dispatch(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: id }));
                }
            } else {
                if (!Number.isNaN(id)) {
                    this.store.dispatch(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: Number(id) }));
                }
            }

            this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
                this.rowData = payor;
                this.cdr.detectChanges();
            });
        });

        this.actions$
            .pipe(ofType(PatientCenterDiagnosiscodeActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    selectCode(params) {
        this.selectedDiagnosisCode = params.api.getSelectedRows()[0] || null;
    }

    submitSelectedCode() {
        this._matDialogRef.close(this.selectedDiagnosisCode);
    }
}
