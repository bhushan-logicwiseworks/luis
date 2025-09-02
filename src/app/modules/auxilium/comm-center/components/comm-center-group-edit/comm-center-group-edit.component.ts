import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuthSelectors } from 'app/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { EmailGroupEdit } from 'app/shared/interfaces/auxilium/comm-center/email-group-edit-interface';
import { CommCenterCreateActions } from '../../actions/comm-center-create.actions';
import { CommCenterEmailActions } from '../../actions/comm-center-email.actions';
import { CommCenterCreateSelectors } from '../../reducers';
import { CommCenterCreateComponent } from '../comm-center-create/comm-center-create.component';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';

@UntilDestroy()
@Component({
    selector: 'app-comm-center-group-edit',
    templateUrl: './comm-center-group-edit.component.html',
    styleUrls: ['./comm-center-group-edit.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatCheckbox,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class CommCenterGroupEditComponent {
    owners$ = this.store.select(CommCenterCreateSelectors.selectOwners);
    loadingOwners$ = this.store.select(CommCenterCreateSelectors.selectLoadingOwners);
    loading$ = this.store.select(CommCenterCreateSelectors.selectLoading);
    error$ = this.store.select(CommCenterCreateSelectors.selectError);
    user$ = this.store.select(AuthSelectors.selectUser);
    selectedRowData;
    form: FormGroup;
    dateFormat: string = constVariables.DATE_FORMAT;
    constructor(
        private fb: UntypedFormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private store: Store,
        private actions$: Actions,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<CommCenterCreateComponent>
    ) {
        this.selectedRowData = data.dynamicComponentData;
        this.form = this.fb.group({
            label: [''],
            duedate: ['', this.auxUtilService.futureDateValidator()],
            owner: [''],
            NewOwner: [''],
            isOwnerClear: [false],
            currentUser: [''],
            isDueDateClear: [false],
            isLabelClear: [false],
        });
    }

    ngOnInit(): void {
        this.user$.pipe(untilDestroyed(this)).subscribe(user =>
            this.form.patchValue({
                from: user.email,
            })
        );

        this.store.dispatch(CommCenterCreateActions.LoadOwners());

        this.actions$
            .pipe(ofType(CommCenterCreateActions.CreateEmailSuccess), untilDestroyed(this))
            .subscribe(() => this.dialogRef.close());
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        let dto: EmailGroupEdit = this.form.value;
        const ids = this.selectedRowData.map(row => row.id);
        dto.numbers = ids;
        const defaultDueDate = '1900-01-01T00:00:00';
        dto.duedate = dto.duedate === '' ? defaultDueDate : dto.duedate;
        this.updateOwner(dto);
        this.dialogRef.close();
    }

    updateOwner(editGroup: EmailGroupEdit) {
        this.store.dispatch(
            CommCenterEmailActions.UpdateEmailGroupEdit({
                emailEditGroup: editGroup,
            })
        );
    }

    onDateChange(event, formControlName) {
        this.form = this.auxUtilService.manuallyCheckDateValid(event.target.value, this.form, formControlName);
    }
}
