import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Subject, combineLatest, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PostingCenterTableActions } from '../../actions/posting-center-table.action';
import { PostingCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-posting-demographics',
    templateUrl: './posting-demographics.component.html',
    styleUrls: ['./posting-demographics.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
        DateFormatPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PostingDemographicsComponent implements OnInit {
    eobId: number;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    patientEOB$ = this.store.select(PostingCenterTableSelectors.selectEOBById);
    loading$ = this.store.select(PostingCenterTableSelectors.selectLoading);
    toolbarData: FuseNavigationItem[];
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
            field: 'id',
            filter: 'agNumberColumnFilter',
            minWidth: 80,
            hide: false,
        },
        {
            headerName: 'EOB ID',
            field: 'eobid',
            filter: 'agNumberColumnFilter',
            minWidth: 100,
            hide: false,
        },
        {
            headerName: 'Patient Control #',
            field: 'patientControlNumber',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
            hide: false,
        },
        {
            headerName: 'Patient Name',
            field: 'patientName',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
            hide: false,
        },
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'Claim Amount',
            field: 'claimAmount',
            filter: 'agNumberColumnFilter',
            valueFormatter: params => (params.value != null ? `$${params.value.toFixed(2)}` : ''),
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'Claim Status',
            field: 'claimStatusCode',
            filter: 'agMultiColumnFilter',
            minWidth: 140,
            hide: false,
        },
        {
            headerName: 'Raw Data',
            field: 'rawData',
            filter: 'agTextColumnFilter',
            minWidth: 300,
            flex: 1, // expand to use remaining space
            hide: true, // often hidden by default unless needed
        },
        {
            headerName: 'View EOB',
            field: 'viewEOB',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'viewEOB' },
            minWidth: 75,
            onCellClicked: params => this.openPatientViewEOB(this.eobId, params.data.id),
        },
    ];
    visibleColumns = [
        'id',
        'eobid',
        'patientControlNumber',
        'patientName',
        'patientId',
        'claimAmount',
        'claimStatusCode',
        'createdDate',
        'viewEOB',
    ];
    rowData;

    constructor(
        private store: Store,
        private currency: CurrencyPipe,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateFormatePipe: DateTimeFormatPipe,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        combineLatest([
            this.activatedRoute.parent.paramMap, // Changed from activatedRoute.paramMap to activatedRoute.parent.paramMap
            this.refresh$.pipe(startWith(null), debounceTime(100), distinctUntilChanged()),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const id = paramMap.get('id');
                this.eobId = id && !isNaN(+id) ? +id : 0;
            });

        this.patientEOB$.pipe(untilDestroyed(this)).subscribe(access => {
            this.rowData = access;
        });
    }

    openPatientViewEOB(eobid: number, refId: number) {
        this.store.dispatch(PostingCenterTableActions.LoadPatientEOBById({ eobid, refId }));
    }
}
