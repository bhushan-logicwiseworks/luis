import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ProofOfDeliveryTableActions } from '../../actions/proof-of-delivery-table.actions';
import { ProofOfDeliveryIndividualFormComponent } from '../../components/proof-of-delivery-individual-form/proof-of-delivery-individual-form.component';
import { ProofOfDeliveryTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-proof-of-delivery-table',
    templateUrl: './proof-of-delivery-table.component.html',
    styleUrls: ['./proof-of-delivery-table.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ProofOfDeliveryTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 50,
            field: 'id',
            onCellClicked: params => this.openItem(params),
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Vender',
            minWidth: 50,
            field: 'vendor',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'PATIENTID',
            minWidth: 100,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientid' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientid } }),
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'PONUBER',
            minWidth: 100,
            field: 'ponumber',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'TRACKINGNUMBER',
            minWidth: 200,
            field: 'trackingnumber',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'trackingnumber' },
            onCellClicked: params =>
                this.handleRedirect('trackingnumber', { data: { trackingnumber: params.data.trackingnumber } }),
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'CARRIER',
            minWidth: 80,
            field: 'shippingcarrier',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'SHIPSTATUS',
            minWidth: 150,
            field: 'shipstatus',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'RESULT',
            minWidth: 150,
            field: 'results',
            filter: 'agMultiColumnFilter',
            onCellClicked: params => this.openItem(params),
            sortIndex: 8,
            hide: true,
        },
        {
            headerName: 'SHIPDATE',
            minWidth: 150,
            field: 'shipdate',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.createdBy),
            onCellClicked: params => this.openItem(params),
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'ISCOMPLETE',
            minWidth: 100,
            field: 'iscomplete',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'iscomplete' },
            onCellClicked: params => this.openItem(params),
        },
        {
            headerName: 'FILEATTECHED',
            minWidth: 100,
            field: 'fileattached',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'fileattached' },
            onCellClicked: params => this.openItem(params),
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

    visibleColumns = [
        'id',
        'vendor',
        'patientid',
        'ponumber',
        'trackingnumber',
        'shippingcarrier',
        'shipstatus',
        'shipdate',
        'iscomplete',
        'fileattached',
    ];

    loading$ = this.store.select(ProofOfDeliveryTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ProofOfDeliveryTableSelectors.selectUsers))
    );
    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimeFormate: DateTimeFormatPipe,
        private actions$: Actions,
        private dialog: MatDialog,
        private auxUtilService: AuxUtilService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {});

        this.data$.pipe(untilDestroyed(this)).subscribe(users => {
            this.rowData = users;
        });

        this.actions$.pipe(ofType(ProofOfDeliveryTableActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    ngOnDestroy(): void {
        this.store.dispatch(ProofOfDeliveryTableActions.ResetState());
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'PROOF OF DELIVERY',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ProofOfDeliveryIndividualFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'updateShipDetails',
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

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
