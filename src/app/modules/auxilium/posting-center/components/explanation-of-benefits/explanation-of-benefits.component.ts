import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { combineLatest, startWith, Subject } from 'rxjs';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '../../../../../../@fuse/components/navigation';
import { FuseConfirmationService } from '../../../../../../@fuse/services/confirmation';
import { ActionButtonRendererComponent } from '../../../../../shared/components/action-button-renderer/action-button-renderer.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { Remits835Display } from '../../../../../shared/interfaces/auxilium/bill-center/remits-835.interface';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PostingCenterTableActions } from '../../actions/posting-center-table.action';
import { PostingCenterTableSelectors } from '../../reducers';
import { PostingDocumentFormComponent } from '../posting-document-form/posting-document-form.component';

@UntilDestroy()
@Component({
    selector: 'app-explanation-of-benefits',
    templateUrl: './explanation-of-benefits.component.html',
    styleUrls: ['./explanation-of-benefits.component.scss'],
    animations: fuseAnimations,
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [NgIf, AuxAgGridComponent, AsyncPipe, FuseHorizontalNavigationComponent],
})
export class ExplanationOfBenefitsComponent {
    loading$ = this.store.select(PostingCenterTableSelectors.selectLoading);
    data$ = this.store.select(PostingCenterTableSelectors.selectEOBData);
    toolbarData: FuseNavigationItem[] = [];
    rowData = [];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
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
            minWidth: 50,
            hide: false,
        },
        {
            headerName: 'Original File Name',
            field: 'originalFileName',
            filter: 'agMultiColumnFilter',
            minWidth: 250,
            hide: false,
        },
        {
            headerName: 'New File Name',
            field: 'newFileName',
            filter: 'agMultiColumnFilter',
            minWidth: 250,
            hide: false,
        },
        {
            headerName: 'Check Number',
            field: 'checkNumber',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'Total Amount',
            field: 'totalAmount',
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => this.currency.transform(params.data.totalAmount, 'USD', 'symbol'),
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'Payor Name',
            field: 'payorName',
            filter: 'agMultiColumnFilter',
            minWidth: 300,
            hide: false,
        },
        {
            headerName: 'Date Issued',
            field: 'dateIssued',
            valueFormatter: params => this.dateFormatePipe.transform(params.value),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'EFT Trace Number',
            field: 'eftTraceNumber',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'Date Added',
            field: 'dateAdded',
            valueFormatter: params => this.dateFormatePipe.transform(params.value),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
            hide: false,
        },
        {
            headerName: 'View EOB',
            field: 'viewEOB',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'viewEOB' },
            minWidth: 75,
            onCellClicked: params => this.openViewEOB(params.data.id),
        },
        {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Record',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            hide: false,
        },
    ];

    visibleColumns = [
        'id',
        'checkNumber',
        'totalAmount',
        'payorName',
        'dateIssued',
        'dateAdded',
        'eftTraceNumber',
        'viewEOB',
        'actions',
    ];

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private route: ActivatedRoute,
        private router: Router,
        private matDialog: MatDialog,
        private auxSearchService: AuxSearchService,
        private currency: CurrencyPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.toolbarData = [
            {
                title: 'Upload Document',
                type: 'basic',
                icon: 'heroicons_outline:cloud-upload',
                function: () => {
                    this.toolbarAction();
                },
            },
        ];
    }
    selection = new SelectionModel<Remits835Display>(true, []);

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PostingCenterTableActions.LoadExplanationOfBenefits());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(agingReport => {
            if (agingReport) {
                this.rowData = agingReport;
            }
        });

        this.actions$
            .pipe(ofType(PostingCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
        // this.store.dispatch(PostingCenterTableActions.LoadExplanationOfBenefits());
    }

    openViewEOB(id: number) {
        this.store.dispatch(PostingCenterTableActions.LoadEOB({ id }));
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }

    selectionChange(params) {
        const excludedColumns = ['actions', 'viewEOB'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.router.navigateByUrl(`/centers/posting-center/${params.api.getSelectedRows()[0].id}/eob-patients`);
        }
    }

    toolbarAction() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Upload Document',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Upload',
            dynamicComponent: PostingDocumentFormComponent,
            dynamicComponentData: null,
            submitFunction: 'saveDocument',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '40%',
            minHeight: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    delete(delData: any) {
        this.deleteRecord(delData.data);
    }

    deleteRecord(dto: Remits835Display): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Record',
            message: 'Are you sure you want to remove this record? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.store.dispatch(PostingCenterTableActions.DeleteExplanationOfBenefits({ id: dto.id }));
                }
            });
    }
}
