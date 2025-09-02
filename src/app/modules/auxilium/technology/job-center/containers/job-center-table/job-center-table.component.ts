import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { JobCenterIconComponent } from 'app/shared/components/auxilium/job-center-icon/job-center-icon.component';
import { JobDisplay } from 'app/shared/interfaces/auxilium/job-center/job-display.interface';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { JobCenterTableActions } from '../../actions/job-center-table.actions';
import { JobIndividualFormComponent } from '../../components/job-individual-form/job-individual-form.component';
import { JobCenterTableSelectors } from '../../reducers';
import { JobHistoryModalComponent } from './job-history-modal/job-history-modal.component';

@UntilDestroy()
@Component({
    selector: 'ac-job-center-table',
    templateUrl: './job-center-table.component.html',
    styleUrls: ['./job-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class JobCenterTableComponent implements OnInit {
    columnDefs: ColDef[] = [
        {
            headerName: 'Job Id',
            minWidth: 50,
            field: 'jobId',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Enabled',
            minWidth: 85,
            field: 'isEnabled',
            cellRenderer: SourceChipComponent,
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            cellRendererParams: params => {
                return {
                    isEnabled: params.data.isEnabled === true ? 'TRUE' : 'FALSE',
                };
            },
        },
        {
            headerName: 'Job Name',
            minWidth: 275,
            field: 'jobName',
            sort: 'asc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Schedule',
            minWidth: 300,
            field: 'schedule',
            filter: 'agTextColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Today',
            minWidth: 50,
            field: 'isToday',
            cellRenderer: JobCenterIconComponent,
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            cellRendererParams: {
                fieldName: 'isToday',
            },
        },
        {
            headerName: 'Pending',
            minWidth: 50,
            field: 'todayRun',
            cellRenderer: JobCenterIconComponent,
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            cellRendererParams: {
                fieldName: 'pending',
            },
        },
        {
            headerName: 'Last Run',
            minWidth: 130,
            field: 'lastRun',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Next Run',
            minWidth: 130,
            field: 'nextRun',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Last Status',
            minWidth: 100,
            field: 'lastStatus',
            cellRenderer: SourceChipComponent,
            cellRendererParams: params => {
                return {
                    category: params.data.lastStatus,
                };
            },
            sortIndex: 7,
            hide: false,
            filter: 'agMultiColumnFilter',
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
        },
        {
            headerName: 'Actions',
            minWidth: 150,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'View History',
                        action: this.viewHistory.bind(this),
                        icon: 'remove_red_eye',
                        color: 'text-blue-500',
                    },
                    {
                        name: 'Delete Permanently',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                    {
                        name: 'Run Now',
                        action: this.runNowValidation.bind(this),
                        icon: 'mat_outline:bolt',
                        color: 'text-yellow-500',
                        disabled: params => params.data.lastStatus === 'RUNNING',
                    },
                ],
            },
            filter: false,
            sortIndex: 8,
            hide: false,
            sortable: false,
        },
    ];

    visibleColumns = [
        'isEnabled',
        'jobName',
        'schedule',
        'isToday',
        'todayRun',
        'lastRun',
        'nextRun',
        'lastStatus',
        'actions',
    ];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => {
            return this.store.select(JobCenterTableSelectors.selectJobCenter);
        })
    );
    loading$ = this.store.select(JobCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    selectedRowIndex: number = -1;
    rowData = [];

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private searchService: AuxSearchService,
        private cd: ChangeDetectorRef,
        @Inject(Actions) private actions$: Actions,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');

                switch (filterSlug) {
                    // BY TYPE
                    case 'all':
                        this.loadJobs();
                        break;
                    case 'hourly':
                        this.loadJobs(['Hourly'], []);
                        break;
                    case 'daily':
                        this.loadJobs(['Daily'], []);
                        break;
                    case 'weekly':
                        this.loadJobs(['Weekly'], []);
                        break;

                    // BY STATUS
                    case 'success':
                        this.loadJobs([], ['Success']);
                        break;
                    case 'fail':
                        this.loadJobs([], ['Fail']);
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(jobs => {
            this.rowData = jobs;
        });

        this.searchService.search$.pipe(untilDestroyed(this)).subscribe(value => this.onFilterChange(value));

        this.actions$
            .pipe(ofType(JobCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    loadJobs(types?: string[], statuses?: string[]) {
        types = types || [];
        statuses = statuses || [];
        this.store.dispatch(JobCenterTableActions.LoadJobs({ types, statuses }));
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE JOB',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: JobIndividualFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'saveJob',
            addonButtonText: '',
            addonSubmitFunction: '',
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
            .subscribe(res => {
                this.refresh.next(null);
                item.api.clearFocusedCell();
            });
    }

    deleteRow(params: any) {
        this.deleteJob(params.data);
    }

    runNowValidation(params: any) {
        if (params.data.lastStatus == 'RUNNING') {
            Swal.fire({
                title: 'There is an instance of the report running.',
                text: 'error',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'CANCEL',
            });
        } else {
            Swal.fire({
                title: 'Are you sure you want to run the report now?',
                text: '',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes, run it!',
            }).then(result => {
                if (result.isConfirmed) {
                    this.store.dispatch(JobCenterTableActions.runNow({ jobId: params.data.jobId }));
                }
            });
        }
    }
    viewHistory(params: any) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Job History',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: JobHistoryModalComponent,
            dynamicComponentData: params.data.jobId,
            submitFunction: 'submitActions',
            enterKeyEnabled: true,
        };
        const dialogRef = this.dialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });

        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                popupData.dynamicComponentData = null;
                this.refresh.next(result);
                params.api.clearFocusedCell();
            });
    }

    onFilterChange(value?: string) {
        // if (!this.dataSource) {
        //   return;
        // }
        value = value?.trim();
        value = value?.toLowerCase();
        // this.dataSource.filter = value || '';
        this.cd.detectChanges();
        this.cd.markForCheck();
    }

    // viewHistory(job) {
    //   this.highlight(job);
    //   const id = job.jobId;
    //   this.dialog.open(JobHistoryComponent, {
    //     data: { id },
    //     width: '600px',
    //     maxWidth: '100%',
    //   }).beforeClosed().subscribe((value) => this.refresh.next(value));
    // }

    editJob(job: JobDisplay) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE JOB',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: JobIndividualFormComponent,
            dynamicComponentData: job.jobId || null,
            submitFunction: 'saveContact',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '550px',
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
                this.refresh.next(result);
            });
    }

    deleteJob(item): void {
        // Open the confirmation dialog
        const jobId: number = item.jobId;
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete job',
            message: 'Are you sure you want to delete this job? This action cannot be undone!',
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
                    // Delete the job
                    this.store.dispatch(JobCenterTableActions.DeleteJob({ jobId }));
                }
            });
    }

    // toggleColumn(column: string, event?: MouseEvent) {
    //   event?.stopPropagation();
    //   if (this.visibleColumns.includes(column)) {
    //     this.visibleColumns = this.visibleColumns.filter(visible => visible !== column);
    //   } else {
    //     this.visibleColumns = [...this.visibleColumns, column].sort((a, b) => this.columns[a].position > this.columns[b].position ? 1 : -1);
    //   }
    // }

    // highlight(job){
    //   this.selectedRowIndex = job.jobId;
    // }

    // compareDates(dt) {
    //   const todaysdate = Date.now();
    //   var dtToday = formatDate(todaysdate, 'M/d/yy', 'en-US');
    //   var dtJob = formatDate(dt, 'M/d/yy', 'en-US');
    //   if ( dtToday == dtJob) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
}
