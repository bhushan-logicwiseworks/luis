import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuthSelectors } from 'app/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { CreateEmailDto } from 'app/shared/interfaces/auxilium/comm-center/create-email.dto';
import { QuillEditorComponent } from 'ngx-quill';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { CommCenterCreateActions } from '../../actions/comm-center-create.actions';
import { CommCenterCreateSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-comm-center-create',
    templateUrl: './comm-center-create.component.html',
    styleUrls: ['./comm-center-create.component.scss'],
    imports: [
        ReactiveFormsModule,
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatCheckbox,
        MatSelect,
        MatOption,
        LoadingOverlayComponent,
        QuillEditorComponent,
        AsyncPipe,
    ],
})
export class CommCenterCreateComponent implements OnInit {
    @ViewChild('quillEditor') quillEditor: QuillEditorComponent;
    owners$ = this.store.select(CommCenterCreateSelectors.selectOwners);
    loadingOwners$ = this.store.select(CommCenterCreateSelectors.selectLoadingOwners);
    loading$ = this.store.select(CommCenterCreateSelectors.selectLoading);
    error$ = this.store.select(CommCenterCreateSelectors.selectError);
    user$ = this.store.select(AuthSelectors.selectUser);
    form: FormGroup;
    dateFormat: string = constVariables.DATE_FORMAT;
    quillModules: any = {
        toolbar: false,
    };

    constructor(
        private fb: UntypedFormBuilder,
        private store: Store,
        private actions$: Actions,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<CommCenterCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { patientId: number }
    ) {
        this.form = this.fb.group({
            from: ['', [Validators.required]],
            subject: [''],
            taskdate: ['', [Validators.required, this.auxUtilService.futureDateValidator()]],
            label: ['', [Validators.required]],
            owner: ['', [Validators.required]],
            body: [''],
            auth: [false],
            verify: [false],
            notes: [false],
            referral: [false],
            signon: [false],
            addedrx: [false],
        });
    }

    ngOnInit(): void {
        this.user$.pipe(untilDestroyed(this)).subscribe(user =>
            this.form.patchValue({
                from: user.email,
            })
        );

        // Append patientId to label if available
        if (this.data.patientId > 0) {
            this.form.get('label')?.patchValue(`${this.data.patientId}`, { emitEvent: false });
        }

        this.store.dispatch(CommCenterCreateActions.LoadOwners());

        this.actions$
            .pipe(ofType(CommCenterCreateActions.CreateEmailSuccess), untilDestroyed(this))
            .subscribe(() => this.dialogRef.close());
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        let dto: CreateEmailDto = this.form.value;

        // Get plain text from Quill editor instead of HTML
        const quill = this.quillEditor.quillEditor;
        dto.body = quill.getText();

        dto = this.auxUtilService.cleanData(dto);

        dto = { ...dto, patientId: this.data.patientId };
        this.store.dispatch(CommCenterCreateActions.CreateEmail({ dto }));
    }

    onDateChange(event, formControlName) {
        this.form = this.auxUtilService.manuallyCheckDateValid(event.target.value, this.form, formControlName);
    }

    // Handle checkbox changes to append tags to label
    onCheckboxChange(controlName: string, tag: string) {
        const labelControl = this.form.get('label');
        const isChecked = this.form.get(controlName)?.value;

        if (isChecked) {
            labelControl?.patchValue(`${labelControl.value} ${tag}`.trim(), { emitEvent: false });
        } else {
            // Remove the tag if unchecked (optional, based on your preference)
            const currentLabel = labelControl?.value || '';
            labelControl?.patchValue(currentLabel.replace(new RegExp(`\\b${tag}\\b`, 'gi'), '').trim(), {
                emitEvent: false,
            });
        }
    }
}
