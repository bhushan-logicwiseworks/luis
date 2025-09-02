import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import conditionalValidator from 'app/core/auth/validator/conditional-validator';
import { JobDisplay } from 'app/shared/interfaces/auxilium/job-center/job-display.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';
import { JobIndividualActions } from '../../actions/job-center-individual.actions';
import { JobCenterTableActions } from '../../actions/job-center-table.actions';
import { JobCenterTableSelectors } from '../../reducers';
import { ScheduleType } from '../../schedule-type.enum';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';

@UntilDestroy()
@Component({
    selector: 'ac-job-individual-form',
    templateUrl: './job-individual-form.component.html',
    styleUrls: ['./job-individual-form.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        CdkTextareaAutosize,
        MatSelect,
        MatOption,
        MatCheckbox,
    ],
})
export class JobIndividualFormComponent implements OnInit {
    job: JobDisplay;
    @Input() showDeleteButton: boolean = false;

    addForm: UntypedFormGroup;
    dateFormat: string = constVariables.DATE_FORMAT;
    editMode: boolean = false;
    alert: any;
    scheduleTypes = ScheduleType;
    selectActiveJob$ = this.store.select(JobCenterTableSelectors.selectActiveJob);

    scheduleHours = Array(24)
        .fill(0)
        .map((x, i) => i);

    scheduleMinutes = Array(12)
        .fill(5)
        .map((x, i) => i * x);

    daysOfMonth = Array(31)
        .fill(0)
        .map((x, i) => {
            return { id: i + 1 };
        });

    daysOfWeek = [
        { name: 'SUNDAY', id: 0 },
        { name: 'MONDAY', id: 1 },
        { name: 'TUESDAY', id: 2 },
        { name: 'WEDNESDAY', id: 3 },
        { name: 'THRUSDAY', id: 4 },
        { name: 'FRIDAY', id: 5 },
        { name: 'SATURDAY', id: 6 },
    ];

    months = [
        { name: 'JANUARY', id: 1 },
        { name: 'FEBRUARY', id: 2 },
        { name: 'MARCH', id: 3 },
        { name: 'APRIL', id: 4 },
        { name: 'MAY', id: 5 },
        { name: 'JUNE', id: 6 },
        { name: 'JULY', id: 7 },
        { name: 'AUGUST', id: 8 },
        { name: 'SEPTEMBER', id: 9 },
        { name: 'OCTOBER', id: 10 },
        { name: 'NOVEMBER', id: 11 },
        { name: 'DECEMBER', id: 12 },
    ];

    weekNumbers = [
        { name: '1st', id: 1 },
        { name: '2nd', id: 2 },
        { name: '3rd', id: 3 },
        { name: '4th', id: 4 },
        { name: 'Last', id: 5 },
    ];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<JobIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        @Inject(Actions) private actions$: Actions
    ) {
        this.job = data.dynamicComponentData;
        this.initForm();
    }

    ngOnInit() {
        Promise.resolve().then(() => {
            if (this.job?.jobId) {
                this.store.dispatch(JobCenterTableActions.GetJob({ jobId: this.job?.jobId }));
                this.selectActiveJob$.pipe(untilDestroyed(this)).subscribe(jobData => {
                    this.initForm(jobData);
                    this.addForm.patchValue(jobData);
                    this.daysOfWeek.map((dow, i) => {
                        (this.addForm.controls.daysOfWeek as UntypedFormArray).controls[i].setValue(
                            jobData && jobData !== null ? jobData.daysOfWeek?.includes(dow.id) : false
                        );
                    });
                });
            } else {
                this.initForm();
            }
            this.actions$.pipe(ofType(JobIndividualActions.CreateJobSuccess), untilDestroyed(this)).subscribe(() => {
                // this.save.emit()
            });
        });
    }

    get scheduleTypesOptions() {
        return Object.keys(ScheduleType);
    }

    initForm(jobData?: Job) {
        this.addForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            commandText: ['', [Validators.required]],
            start: ['', [Validators.required]],
            end: [''],
            hour: ['', [Validators.required]],
            minute: ['', [Validators.required]],
            scheduleType: ['', [Validators.required]],
            isEnabled: [false],
            repeatDays: [
                '',
                [conditionalValidator(() => this.selectedScheduleIs(ScheduleType.DAILY), Validators.required)],
            ],
            repeatWeeks: [
                '',
                [conditionalValidator(() => this.selectedScheduleIs(ScheduleType.WEEKLYSKIP), Validators.required)],
            ],
            months: new UntypedFormArray(
                this.months.map(m => new UntypedFormControl(jobData ? jobData.months?.includes(m.id) : null))
            ),
            weekOfMonth: [
                '',
                [conditionalValidator(() => this.selectedScheduleIs(ScheduleType.WEEKNUMBER), Validators.required)],
            ],
            daysOfMonth: new UntypedFormArray(
                this.daysOfMonth.map(
                    day => new UntypedFormControl(jobData ? jobData.daysOfMonth?.includes(day.id) : null)
                )
            ),
            daysOfWeek: new UntypedFormArray(
                this.daysOfWeek.map(dow => {
                    return new UntypedFormControl(
                        jobData && jobData !== null ? jobData.daysOfWeek?.includes(dow.id) : false
                    );
                })
            ),
        });
    }

    get daysOfMonthFormArray() {
        return this.addForm.controls.daysOfMonth as UntypedFormArray;
    }

    get monthsFormArray() {
        return this.addForm.controls.months as UntypedFormArray;
    }

    selectedScheduleIs(is: ScheduleType) {
        return this.addForm.get('scheduleType').value === is;
    }

    saveJob(): void {
        if (this.addForm.invalid) {
            return;
        }
        const formValue = this.addForm.value;
        const job = {} as Job;

        job.name = formValue.name;
        job.commandText = formValue.commandText;
        job.isEnabled = formValue.isEnabled;
        job.scheduleType = formValue.scheduleType;
        job.start = formValue.start;
        if (formValue.end == '') {
            job.end = null;
        } else {
            job.end = formValue.end;
        }
        job.hour = formValue.hour;
        job.minute = formValue.minute;

        if (job.scheduleType == ScheduleType.DAILY) {
            job.repeatDays = formValue.repeatDays;
        }
        job.lastStatus = this.job?.lastStatus ? this.job?.lastStatus : '';

        if (
            [ScheduleType.WEEKLY, ScheduleType.WEEKLYSKIP, ScheduleType.WEEKNUMBER].includes(
                ScheduleType[job.scheduleType]
            )
        ) {
            job.daysOfWeek = this.reduceArr(formValue.daysOfWeek, this.daysOfWeek);

            if (job.scheduleType == ScheduleType.WEEKLYSKIP) {
                job.repeatWeeks = formValue.repeatWeeks;
            }
            if (job.scheduleType == ScheduleType.WEEKNUMBER) {
                job.weekOfMonth = formValue.weekOfMonth;
            }
        }

        if (job.scheduleType == ScheduleType.CALENDAR) {
            job.daysOfMonth = this.reduceArr(formValue.daysOfMonth, this.daysOfMonth);
            job.months = this.reduceArr(formValue.months, this.months);
        }

        if (this.job?.jobId) {
            job.id = this.job?.jobId;
            this.store.dispatch(JobCenterTableActions.updateJob({ job }));
            this.dialogRef.close();
        } else {
            this.store.dispatch(JobIndividualActions.CreateJob({ job }));
            this.dialogRef.close();
        }
    }

    reduceArr(flagArray: boolean[], valueArray: { id: any }[]) {
        return flagArray.reduce((filtered, element, index) => {
            if (element) {
                filtered.push(valueArray[index].id);
            }
            return filtered;
        }, []);
    }
}
