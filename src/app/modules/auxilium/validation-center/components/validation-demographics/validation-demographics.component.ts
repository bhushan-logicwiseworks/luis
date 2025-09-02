import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import { Validation } from 'app/shared/interfaces/auxilium/validation-center/validation.interface';
import moment from 'moment';
import { Subject, switchMap } from 'rxjs';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/patient-checklists.enum';
import { ValidationCenterIndividualActions } from '../../actions/validation-center-individual.actions';
import { ValidationCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@UntilDestroy()
@Component({
    selector: 'app-validation-demographics',
    templateUrl: './validation-demographics.component.html',
    styleUrls: ['./validation-demographics.component.scss'],
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
        MatCheckbox,
    ],
})
export class ValidationDemographicsComponent {
    validationForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    usstates = states;
    validationDetails: Validation;
    refresh = new Subject();
    data$ = this.store.select(ValidationCenterTableSelectors.selecttaxonomy);
    validationData$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ValidationCenterTableSelectors.selectValidationById))
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
        @Inject(Actions) private actions$: Actions,
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
        this.validationForm = this.fb.group({
            id: [0],
            entity: [''],
            title: [''],
            failcode: [''],
            failmessage: [''],
            isactive: [false],
            bypassforpayors: [''],
            executeforpayors: [''],
            notes: [''],
            adduserid: [''],
            adddate: [''],
            columns: [''],
            severity: [''],
            validateformode: [''],
            billformstoskip: [''],
        });

        this.validationData$.pipe(untilDestroyed(this)).subscribe((result: any) => {
            if (result) {
                this.validationDetails = result.value;
                this.validationForm.patchValue(this.validationDetails);
            }
        });

        this.actions$
            .pipe(ofType(ValidationCenterIndividualActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    save() {
        if (this.validationForm.invalid) {
            return;
        }
        let validation: Validation = { ...this.validationForm.value };
        if (validation.adddate != '' && validation.adddate != '1900-01-01T00:00:00') {
            validation.adddate = moment(validation.adddate, 'MM/DD/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
        }
        // Transform inputs to uppercase
        validation = this.auxUtilService.transFormValuesToUpperCase(validation, [
            'entity',
            'title',
            'failcode',
            'failmessage',
            'bypassforpayors',
            'executeforpayors',
            'severity',
            'validateformode',
            'billformstoskip',
        ]);

        validation = this.auxUtilService.transFormValues(validation, TranFormInputValues);
        this.store.dispatch(ValidationCenterIndividualActions.AddValidationRep({ validation }));
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }
}
