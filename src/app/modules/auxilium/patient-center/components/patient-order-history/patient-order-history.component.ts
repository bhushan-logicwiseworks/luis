import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PatientOrder } from 'app/shared/interfaces/auxilium/patient-center/patient-order.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientOrderActions } from '../../actions/patient-order-history.action';
import { PatientOrdersSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-patient-order-history',
    templateUrl: './patient-order-history.component.html',
    styleUrls: ['./patient-order-history.component.scss'],
    imports: [
        FuseHorizontalNavigationComponent,
        AuxAgGridComponent,
        AsyncPipe,
    ],
})
export class PatientOrderHistoryComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            minWidth: 100,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Service Date',
            minWidth: 175,
            field: 'serviceDate',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.serviceDate),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Invoice No',
            minWidth: 150,
            field: 'invoiceNumber',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'PO Number',
            minWidth: 200,
            field: 'poNumber',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Tracking No',
            minWidth: 200,
            field: 'trackingNumber',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
            onCellClicked: event => this.selectCell(event),
            cellStyle: {
                color: 'rgb(59,130,246)',
            },
        },
        {
            headerName: 'Ship Status',
            minWidth: 200,
            field: 'shipStatus',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
        },
    ];

    rowData = [];
    toolbarData: FuseNavigationItem[];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    title: string;
    data$ = this.store.select(PatientOrdersSelectors.selectOrders);
    loading$ = this.store.select(PatientOrdersSelectors.selectLoading);
    orders: PatientOrder[];

    visibleColumns = ['id', 'poNumber', 'serviceDate', 'invoiceNumber', 'trackingNumber', 'shipStatus'];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    searchCtrl = new UntypedFormControl();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private matDialog: MatDialog,
        private router: Router,
        private dateTime: DateTimeFormatPipe,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'View Contact Notes',
                type: 'basic',
                icon: 'mat_outline:speaker_notes',
                function: () => {
                    this.viewPatientNotes();
                },
            },
            {
                title: 'View Payors',
                type: 'basic',
                icon: 'mat_outline:money',
                function: () => {
                    this.viewPayors();
                },
            },
        ];
    }

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.route.parent.paramMap
            .pipe(untilDestroyed(this))
            .subscribe(paramMap =>
                this.store.dispatch(PatientOrderActions.loadOrder({ patientId: +paramMap.get('id') }))
            );

        this.data$.pipe(untilDestroyed(this)).subscribe(orders => {
            this.rowData = orders;
        });
    }

    selectCell(params) {
        const url = this.router.serializeUrl(this.router.createUrlTree(['track', params.data.trackingNumber]));
        window.open(url, '_blank');
    }

    ngAfterViewInit(): void {}

    ngOnDestroy() {}

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientContactNotesDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.matDialog
            .open(AuxPopupComponent, {
                width: '650px',
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
            .subscribe(result => {});
    }

    viewPayors() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Payors',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientPayorsListDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.matDialog
            .open(AuxPopupComponent, {
                width: '650px',
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
            .subscribe(result => {});
    }
}
