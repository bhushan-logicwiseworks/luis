import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientDiagnosisCodeAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-add.interface';
import { PatientDiagnosisCodes } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { PatientCenterDiagnosiscodesSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientPayorsListDrawerComponent } from '../../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';
import { PatientDiagnosisCodesAddComponent } from '../patient-diagnosis-codes-add/patient-diagnosis-codes-add.component';
import { PatientDiagnosisCodesEditComponent } from '../patient-diagnosis-codes-edit/patient-diagnosis-codes-edit.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-diagnosis-codes-table',
    templateUrl: './patient-diagnosis-codes-table.component.html',
    styleUrls: ['./patient-diagnosis-codes-table.component.scss'],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientDiagnosisCodesTableComponent {
    rowUpdateOrderData: PatientDiagnosisCodeAdd[];
    title: string;
    data$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectdiagnosiscodesList);
    loading$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectLoading);
    toolbarData: FuseNavigationItem[];

    rowData = [];

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
            onCellClicked: params => this.openDiagnosisDetails(params),
        },
        {
            headerName: 'icd10code',
            minWidth: 101,
            field: 'icd10code',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openDiagnosisDetails(params),
        },
        {
            headerName: 'Description',
            minWidth: 900,
            field: 'description',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openDiagnosisDetails(params),
        },
        {
            headerName: 'icdcodeId',
            minWidth: 101,
            field: 'icdcodeId',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openDiagnosisDetails(params),
        },
        {
            headerName: 'Order',
            minWidth: 101,
            field: 'order',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            onCellClicked: params => this.openDiagnosisDetails(params),
        },
        {
            headerName: 'Actions',
            minWidth: 101,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    /* { name: 'Edit Diagnosis Code', action: this.navigatePhysicianDetails.bind(this), icon: "mat_outline:edit_note", color: 'text-green-500' } , */
                    {
                        name: 'Remove Diagnosis Code',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 13,
            hide: false,
            sortable: false,
        },
    ];

    visibleColumns: string[] = ['id', 'icd10code', 'description', 'actions'];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private route: ActivatedRoute,
        private actions$: Actions,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Assign Diagnosis Codes',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.openDiagnosisCodes();
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

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: id }));
        this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
            this.rowData = payor;
        });

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(
                    PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: +paramMap.get('id') })
                );
            });

        this.actions$
            .pipe(ofType(PatientCenterDiagnosiscodeActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteDiagnosisCodes(params.data);
    }

    /**
     * Delete the Patient
     */
    deleteDiagnosisCodes(dto: PatientDiagnosisCodes): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Diagnosis Code',
            message: 'Are you sure you want to delete this Remove Diagnosis Code? This action cannot be undone!',
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
                    this.store.dispatch(PatientCenterDiagnosiscodeActions.DeletePatientDiagnosiscode({ dto }));
                }
            });
    }

    openDiagnosisCodes() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add Diagnosis Codes',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add Diagnosis Codes',
            dynamicComponent: PatientDiagnosisCodesAddComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'submitCodes',
            enterKeyEnabled: true,
        };
        const dialogRef = this._matDialog.open(AuxPopupComponent, {
            width: 'auto',
            minHeight: 'auto',
            data: popupData,
        });
    }

    openDiagnosisDetails(data) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'EDIT PATIENT DIAGNOSIS CODES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save Diagnosis Codes',
            dynamicComponent: PatientDiagnosisCodesEditComponent,
            dynamicComponentData: data.api.getSelectedRows()[0] || null,
            submitFunction: 'submitCodes',
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
                data.api.clearFocusedCell();
            });
    }

    navigatePhysicianDetails(idcData) {
        this.router.navigateByUrl(`/centers/icdcode-center/${idcData.data.icdcodeId}/icdcode-details`);
    }

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTE',
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
}
