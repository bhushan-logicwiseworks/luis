import { Location, NgClass, AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormSerarchInputValues } from 'app/shared/components/auxilium/patient-search.enum';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { CommCenterEmailActions } from '../../../actions/comm-center-email.actions';
import { CommCenterEmailSelectors } from '../../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@UntilDestroy()
@Component({
    selector: 'app-open-pdf-viewer',
    templateUrl: './open-pdf-viewer.component.html',
    styleUrls: ['./open-pdf-viewer.component.scss'],
    imports: [
        FuseHorizontalNavigationComponent,
        NgClass,
        MatCheckbox,
        PdfViewerModule,
        LoadingOverlayComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatButton,
        CdkTextareaAutosize,
        AsyncPipe,
    ],
})
export class OpenPdfViewerComponent {
    @ViewChild('viewer') viewerRef!: ElementRef;
    @ViewChild(PdfViewerComponent) pdfViewer: PdfViewerComponent;
    searchForm: FormGroup;
    contactForm: FormGroup;
    searchPatientInfo: Patient;
    newPatientId$ = this.store.select(CommCenterEmailSelectors.selectPatients);
    attachments$ = this.store.select(CommCenterEmailSelectors.selectAttachments);
    loadingAttachments$ = this.store.select(CommCenterEmailSelectors.selectLoadingAttachments);
    loading$ = this.store.select(CommCenterEmailSelectors.selectLoading);
    previewUrl$ = this.store.select(CommCenterEmailSelectors.selectPreviewUrl);
    docId: number;
    pages = [];
    currentPage: number = 1;
    pageSize = 1;
    toolbarData: FuseNavigationItem[];
    selectedPages: Set<number> = new Set();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private route: ActivatedRoute,
        private store: Store,
        private location: Location
    ) {
        this.toolbarData = [
            {
                title: 'Back',
                type: 'basic',
                icon: 'mat_outline:arrow_back',
                function: () => {
                    this.back();
                },
            },
        ];
    }

    ngOnInit(): void {
        this.docId = Number(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(CommCenterEmailActions.LoadCommDocument({ attachmentId: this.docId, isPreviewOnly: true }));
        this.newPatientId$.pipe(untilDestroyed(this)).subscribe(data => {
            this.searchPatientInfo = data && data.length ? data[0] : null;
        });
        this.searchForm = this._formBuilder.group({
            id: ['', [Validators.required]],
        });
        this.contactForm = this._formBuilder.group({
            fileName: ['', [Validators.required]],
            description: [''],
            contactNotes: ['', [Validators.required]],
        });
    }

    loadComplete(pdf: any): void {
        if (this.pageSize === 1) {
            this.pageSize = pdf._transport._numPages;
            for (let index = 0; index < pdf._transport._numPages; index++) {
                this.pages.push({
                    page: index + 1,
                    url: null,
                });
            }
        }
    }

    redirectToPage(page: number) {
        this.currentPage = page;
    }

    render($event: any) {
        this.pages[$event.pageNumber - 1].url = $event.source.canvas.toDataURL();
    }

    back() {
        this.location.back();
    }

    searchPatient(): void {
        if (this.searchForm.invalid) {
            return;
        }
        if (this.auxUtilService.objFilled(this.searchForm.value)) {
            let patientSearch = this.searchForm.value;
            // Transform inputs
            patientSearch = this.auxUtilService.transFormValues(patientSearch, TranFormSerarchInputValues);
            this.store.dispatch(CommCenterEmailActions.PatientSearch({ patientSearch }));
        }
    }

    togglePageSelection(pageNumber: number): void {
        if (this.selectedPages.has(pageNumber)) {
            this.selectedPages.delete(pageNumber);
        } else {
            this.selectedPages.add(pageNumber);
        }
    }

    isPageSelected(pageNumber: number): boolean {
        return this.selectedPages.has(pageNumber);
    }

    save() {
        if (this.contactForm.invalid) {
            return;
        }

        let data = {
            attachmentId: this.docId,
            patientId: this.searchForm.get('id').value,
            contactNote: this.contactForm.get('contactNotes').value,
            fileName: this.contactForm.get('fileName').value,
            description: this.contactForm.get('description').value,
            pagesToSave: Array.from(this.selectedPages).sort((a, b) => a - b),
        };

        data = this.auxUtilService.transFormValuesToUpperCase(data, ['contactNote']);
        data = this.auxUtilService.transFormValues(data, TranFormSerarchInputValues);

        this.store.dispatch(CommCenterEmailActions.PatientFaxIntoPatientRecord({ contactInfo: data }));
    }

    ngOnDestroy() {
        this.store.dispatch(CommCenterEmailActions.ResetState());
    }
}
