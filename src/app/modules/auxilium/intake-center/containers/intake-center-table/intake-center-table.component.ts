import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxAgIconsComponent } from 'app/shared/components/auxilium/aux-ag-icons/aux-ag-icons.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { IntakeCenterTableActions } from '../../actions/intake-center-table.actions';
import { IntakeCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-intake-center-table',
    templateUrl: './intake-center-table.component.html',
    styleUrl: './intake-center-table.component.scss',
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class IntakeCenterTableComponent implements OnInit, OnDestroy {
    rowData = [];
    columnDefs: ColDef[] = [
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            width: 100,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'LANG',
            field: 'language',
            cellRenderer: AuxAgIconsComponent,
            filter: 'agMultiColumnFilter',
            width: 100,
        },
        { headerName: 'FIRST NAME', field: 'firstName', filter: 'agMultiColumnFilter', width: 175 },
        { headerName: 'LAST NAME', field: 'lastName', filter: 'agMultiColumnFilter', width: 175 },
        {
            headerName: 'DOB',
            field: 'dob',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dob),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
        },
        {
            headerName: 'ENTRYDATE',
            field: 'entryDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.entryDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
        },
        { headerName: 'REFID', field: 'referId', filter: 'agMultiColumnFilter', width: 100 },
        { headerName: 'REF FIRST NAME', field: 'refFirstName', filter: 'agMultiColumnFilter', width: 175 },
        { headerName: 'REF LAST NAME', field: 'refLastName', filter: 'agMultiColumnFilter', width: 175 },
        { headerName: 'REF CITY', field: 'refCity', filter: 'agMultiColumnFilter', width: 150 },
        { headerName: 'REF STATE', field: 'refState', filter: 'agMultiColumnFilter', width: 75 },
        { headerName: 'SALESID', field: 'salesId', filter: 'agMultiColumnFilter', width: 100 },
        { headerName: 'SALES REP NAME', field: 'salesRepName', filter: 'agMultiColumnFilter', width: 175 },
        { headerName: 'CATEGORY', field: 'patientCategory', filter: 'agMultiColumnFilter', width: 115 },
        { headerName: 'STATUS', field: 'patientStatus', filter: 'agMultiColumnFilter', width: 100 },
        { headerName: 'PAYORID', field: 'payorId', filter: 'agMultiColumnFilter', width: 125 },
        { headerName: 'BILL TO', field: 'billTo', filter: 'agMultiColumnFilter', width: 150 },
        // { headerName: 'MEDICARE PATIENT', field: 'medicarePatient', filter: 'agMultiColumnFilter', width: 100, },
        // { headerName: 'COMPLETED PWO RECEIVED', field: 'completedPwoReceived', filter: 'agMultiColumnFilter', width: 100, },
        // { headerName: 'QUALIFYING NOTE RECEIVED', field: 'qualifyingNotesReceived', filter: 'agMultiColumnFilter', width: 100, },
        // { headerName: 'INSURANCE VERIFIED', field: 'insuranceVerified', filter: 'agMultiColumnFilter', width: 100, },
        // { headerName: 'CONTACT ATTEMPT 1', field: 'contactAttempt1', filter: 'agMultiColumnFilter', width: 100, },
        // { headerName: 'CONTACT ATTEMPT 2', field: 'contactAttempt2', filter: 'agMultiColumnFilter', width: 100, },
    ];

    visibleColumns = [
        'patientId',
        'language',
        'firstName',
        'lastName',
        'dob',
        'entryDate',
        'referId',
        'refFirstName',
        'refLastName',
        'refCity',
        'refState',
        'salesId',
        'salesRepName',
        'patientCategory',
        'patientStatus',
        'payorId',
        'billTo',
    ];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(IntakeCenterTableSelectors.selectIntakes))
    );
    loading$ = this.store.select(IntakeCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'onboardready':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'onboardready' }));
                        break;
                    case 'pending':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'pending' }));
                        break;
                    case 'insverify':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'insverify' }));
                        break;
                    case 'swo':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'swo' }));
                        break;
                    case 'notes':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'notes' }));
                        break;
                    case 'auth':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'auth' }));
                        break;
                    case 'pendingincomplete':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'pendingincomplete' }));
                        break;
                    case 'hardship':
                        this.store.dispatch(IntakeCenterTableActions.LoadIntake({ filter: 'hardship' }));
                        break;
                }
            });

        this.data$.subscribe(intakeList => {
            this.rowData = intakeList;
        });
    }

    ngOnDestroy() {
        this.store.dispatch(IntakeCenterTableActions.resetState());
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            return 'US';
        } else if (language == 'SPANISH') {
            return 'ES';
        } else {
            return '';
        }
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
