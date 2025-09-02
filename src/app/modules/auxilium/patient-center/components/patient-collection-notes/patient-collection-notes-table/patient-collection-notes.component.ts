import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCollectionNotesActions } from '../../../actions/patient-collection-notes.actions';
import { PatientCollectionNotesSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientCollectionNoteFormComponent } from '../patient-collection-note-form/patient-collection-note-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-collection-notes',
    templateUrl: './patient-collection-notes.component.html',
    styleUrls: ['./patient-collection-notes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientCollectionNotesComponent implements OnInit, AfterViewInit {
    rowData = [];
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
            headerName: 'Add Date',
            minWidth: 135,
            field: 'addDate',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.addDate),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Contact Type',
            minWidth: 150,
            field: 'contactType',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Note',
            minWidth: 700,
            field: 'note',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            autoHeight: true,
            wrapText: true,
        },
        {
            headerName: 'User',
            minWidth: 125,
            field: 'addUserId',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Message',
            minWidth: 125,
            field: 'message',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Priority',
            minWidth: 150,
            field: 'priority',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
    ];

    options = {
        gridOptions: {
            rowClassRules: {
                'bg-yellow-100': params => params.data.priority === 'PRIORITY',
                'dark:text-gray-600': params => params.data.priority === 'PRIORITY',
            },
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    toolbarData: FuseNavigationItem[];
    title: string;
    shownotes: boolean;
    data$ = this.store.select(PatientCollectionNotesSelectors.selectNotes);
    loading$ = this.store.select(PatientCollectionNotesSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    visibleColumns = ['addDate', 'contactType', 'note', 'addUserId'];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    searchCtrl = new UntypedFormControl();
    selectedRowIndex: number = -1;
    contactType: Patient[];

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private actions$: Actions,
        private dateTime: DateTimeFormatPipe,
        private dialog: MatDialog,
        private titleService: TitleService,
        private searchService: AuxSearchService
    ) {
        this.toolbarData = [
            {
                title: 'Add Collection Note',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addContactNote();
                },
            },
            {
                title: 'Show System Notes',
                type: 'basic',
                icon: 'mat_outline:computer',
                function: () => {
                    if (!this.shownotes) {
                        this.showContactNote();
                    } else {
                        this.hideContactNote();
                    }
                },
            },
        ];
    }

    selection = new SelectionModel<PatientNote>(true, []);

    ngOnInit(): void {
        //this.store.dispatch(PatientCollectionNotesActions.LoadContactType());
        this.store.dispatch(PatientCollectionNotesActions.LoadContactList());

        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        combineLatest([this.route.parent.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(
                    PatientCollectionNotesActions.LoadPatientCollectionNotes({ patientId: +paramMap.get('id') })
                );
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(notes => {
            const myArray = notes;
            const filteredArray = myArray.filter(obj => obj.addUserId !== 'SYSTEM');
            this.rowData = filteredArray;
            this.cdr.detectChanges();
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            this.searchService.search.next(value);
        });

        this.actions$
            .pipe(ofType(PatientCollectionNotesActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    showContactNote() {
        //console.log("show")
        this.toolbarData[1].title = 'Hide System Notes';
        this.data$.pipe(untilDestroyed(this)).subscribe(notes => {
            this.rowData = notes;
            this.shownotes = true;
        });
    }
    hideContactNote() {
        //console.log("hide")
        this.toolbarData[1].title = 'Show System Notes';
        this.data$.pipe(untilDestroyed(this)).subscribe(notes => {
            const myArray = notes;
            const filteredArray = myArray.filter(obj => obj.addUserId !== 'SYSTEM');
            this.rowData = filteredArray;
            this.shownotes = false;
        });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy() {}

    onSelectionChanged(params) {
        this.openContactNote(params);
    }

    openContactNote(note) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE COLLECTION NOTE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCollectionNoteFormComponent,
            dynamicComponentData: note.api.getSelectedRows()[0] || null,
            submitFunction: 'saveContact',
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
                this.refresh.next(result);
                note.api.clearFocusedCell();
            });
    }

    addContactNote() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'ADD COLLECTION NOTE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCollectionNoteFormComponent,
            dynamicComponentData: null,
            submitFunction: 'saveContact',
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
            .subscribe(result => {});
    }
}
