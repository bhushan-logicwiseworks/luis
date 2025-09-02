import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientDocumentsActions } from '../../../actions/patient-documents.actions';
import { PatientDocumentsSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientDocumentFormComponent } from '../../patient-documents/patient-document-form/patient-document-form.component';
import { PatientDocumentIndividualComponent } from '../../patient-documents/patient-document-individual/patient-document-individual.component';
import { PatientPayorsListDrawerComponent } from '../../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-documents',
    templateUrl: './patient-documents.component.html',
    styleUrls: ['./patient-documents.component.scss'],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class PatientDocumentsComponent implements OnInit {
    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            minWidth: 90,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 150,
            field: 'adddate',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.adddate),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Document Name',
            minWidth: 275,
            field: 'documentname',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 400,
            field: 'description',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Note',
            minWidth: 250,
            field: 'note',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 101,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'View Document',
                        action: this.view.bind(this),
                        icon: 'remove_red_eye',
                        color: 'text-blue-500',
                    },
                    {
                        name: 'Delete Document',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 12,
            hide: false,
            sortable: false,
        },
    ];

    toolbarData: FuseNavigationItem[];
    title: string;
    data$ = this.store.select(PatientDocumentsSelectors.selectDocuments);
    loading$ = this.store.select(PatientDocumentsSelectors.selectLoading);
    documents: PatientDocument[];

    visibleColumns = ['adddate', 'documentname', 'description', 'note', 'actions'];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    searchCtrl = new UntypedFormControl();
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    selectedRowIndex: number = -1;
    constructor(
        private _matDialog: MatDialog,
        private store: Store,
        private route: ActivatedRoute,
        private searchService: AuxSearchService,
        private router: Router,
        private actions$: Actions,
        private dateTime: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService,
        private titleService: TitleService
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

    selection = new SelectionModel<PatientDocument>(true, []);

    ngOnInit() {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PatientDocumentsActions.LoadDocuments({ patientId: +paramMap.get('id') }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(documents => {
            this.rowData = documents;
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            this.searchService.search.next(value);
        });
        this.actions$
            .pipe(ofType(PatientDocumentsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openDocumentDetails(doc) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'DOCUMENT DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientDocumentIndividualComponent,
            dynamicComponentData: doc.api.getSelectedRows()[0] || null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this._matDialog
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
                // this.refresh.next(result)
                doc.api.clearFocusedCell();
            });
    }

    ngOnDestroy() {}

    toolbarAction() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Upload Document',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Upload',
            dynamicComponent: PatientDocumentFormComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'saveDocument',
            enterKeyEnabled: true,
        };
        const dialogRef = this._matDialog.open(AuxPopupComponent, {
            width: '40%',
            minHeight: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    view(docData) {
        this.viewDocument(docData.data);
    }

    viewDocument(document: PatientDocument) {
        this.store.dispatch(PatientDocumentsActions.LoadDocument({ id: document.id }));
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openDocumentDetails(params);
        }
    }

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
        this._matDialog
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
        this._matDialog
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

    deleteRow(params) {
        this.deleteDocument(params.data);
    }

    deleteDocument(params): void {
        params.adduserid = params.adduserid == null ? '' : params.adduserid;
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Document',
            message: 'Are you sure you want to delete this Document? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the contact
                    this.store.dispatch(PatientDocumentsActions.DeletePatientDocument({ id: params }));
                }
            });
    }
}
