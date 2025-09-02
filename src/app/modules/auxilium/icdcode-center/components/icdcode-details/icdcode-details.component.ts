import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { Subject, switchMap } from 'rxjs';
import { IcdCodesCenterIndividualActions } from '../../actions/icdcode-center-individual.actions';
import { IcdCodeCenterTableActions } from '../../actions/icdcode-center-table.actions';
import { IcdCodesCenterIndividualSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
    selector: 'app-icdcode-details',
    templateUrl: './icdcode-details.component.html',
    styleUrls: ['./icdcode-details.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatIcon,
        MatFormField,
        MatLabel,
        MatPrefix,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
    ],
})
export class IcdCodeDetailsComponent {
    icdCodeDetailsForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    usstates = states;
    icdCodeDetails: ICDCodeDisplay;
    refresh = new Subject();
    dateFormat: string = constVariables.DATE_FORMAT;
    validationData$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(IcdCodesCenterIndividualSelectors.selectIcdCodeById))
    );
    pecosOptions = [
        {
            option: '',
            value: '',
        },
        {
            option: 'Yes',
            value: 'Y',
        },
        {
            option: 'No',
            value: 'N',
        },
    ];
    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private auxUtilService: AuxUtilService
    ) {
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
        ];
    }

    ngOnInit(): void {
        this.icdCodeDetailsForm = this.fb.group({
            id: [0],
            icd9code: [''],
            status: [''],
            description: [''],
            changeindicator: [''],
            codestatus: [''],
            shortdescription: [''],
            mediumdescription: [''],
            longdescription: [''],
            icd10code: [''],
            icd10description: [''],
            flags: [''],
            inactivedate: [''],
            adddate: [''],
            adduserid: [''],
        });

        this.validationData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.icdCodeDetails = result;
                this.icdCodeDetailsForm.patchValue(this.icdCodeDetails);
            }
        });

        this.actions$
            .pipe(ofType(IcdCodeCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    save() {
        if (this.icdCodeDetailsForm.invalid) {
            return;
        }

        let icdcode: ICDCodeDisplay = this.icdCodeDetailsForm.value;

        // icdcode.adddate = moment(icdcode.adddate, 'MM/DD/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
        // Transform inputs to uppercase
        icdcode = this.auxUtilService.transFormValuesToUpperCase(icdcode, [
            'icd9code',
            'status',
            'description',
            'changeindicator',
            'codestatus',
            'shortdescription',
            'mediumdescription',
            'longdescription',
            'icd10code',
            'icd10description',
            'flags',
        ]);
        this.store.dispatch(IcdCodesCenterIndividualActions.AddIcdCode({ icdcode }));
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    onDateChange(event, formControlName) {
        this.icdCodeDetailsForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.icdCodeDetailsForm,
            formControlName
        );
    }
}
