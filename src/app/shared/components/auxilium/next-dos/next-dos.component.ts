import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuxUtilService } from '../../../aux-service/aux-utils.service';
import { DateFormatPipe } from '../../../pipes/auxilium/aux-dateformat.pipe';
import { NextDosActions } from './actions/next-dos.actions';
import { NextDosSelectors } from './reducers';
import { NextDosState } from './reducers/next-dos.reducer';

@UntilDestroy()
@Component({
    selector: 'app-next-dos',
    templateUrl: './next-dos.component.html',
    styleUrl: './next-dos.component.scss',
    providers: [DateFormatPipe],
    imports: [
        ReactiveFormsModule,
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        NgIf,
        MatError,
        MatSelect,
        MatOption,
        MatDialogActions,
        MatButton,
    ],
})
export class NextDosComponent implements OnInit, OnDestroy {
    nextDosForm: FormGroup;
    private destroy$ = new Subject<void>();
    private loading = false;
    public supplyDaysOptions = [30, 90];

    constructor(
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<NextDosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { filter: string; title: string },
        private auxUtilService: AuxUtilService,
        private store: Store,
        private dateFormatePipe: DateFormatPipe
    ) {
        this.nextDosForm = this._formBuilder.group({
            startDate: ['', [Validators.required]],
            supplyDays: ['', [Validators.required, Validators.min(1)]],
            nexttDos: [{ value: '', disabled: true }],
        });

        this.store
            .select(NextDosSelectors.selectLoading)
            .pipe(takeUntil(this.destroy$))
            .subscribe(loading => {
                this.loading = loading;
            });

        this.store
            .select(NextDosSelectors.selectNextDosState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: NextDosState) => {
                if (state && state.nexttDos) {
                    // Store the values from the response in the form
                    const { nexttDos } = state;
                    const formattedDate = this.dateFormatePipe.transform(nexttDos);
                    this.nextDosForm.patchValue({
                        ...state,
                        nexttDos: formattedDate,
                    });
                }
            });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit(): void {
        if (this.loading) {
            return;
        }
        if (this.nextDosForm.valid) {
            const formValue = this.nextDosForm.value;
            const payload = {
                lastDos: this.auxUtilService.formatDate(formValue.startDate),
                supplyDays: formValue.supplyDays,
            };

            // Dispatch the calculate action
            this.store.dispatch(NextDosActions.calculateNextDos(payload));

            // Subscribe to the store to get the calculated NextDosResponse
        } else {
            // Mark all form fields as touched to trigger validation messages
            Object.keys(this.nextDosForm.controls).forEach(key => {
                const control = this.nextDosForm.get(key);
                control.markAsTouched();
            });
        }
    }

    onCancel(): void {
        this._dialogRef.close();
    }
}
