import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { PayorBillOptionActions } from '../../actions/payor-bill-option.action';
import { PayorCenterDetailSelectors, PayorCenterTableSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect, MatSelectTrigger, MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-payor-center-bill-options',
    templateUrl: './payor-center-bill-options.component.html',
    styleUrls: ['./payor-center-bill-options.component.scss'],
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatSelect,
        MatSelectTrigger,
        MatOption,
        AsyncPipe,
    ],
})
export class PayorCenterBillOptionsComponent {
    payorBilloptionForm: FormGroup;
    toolbarData: FuseNavigationItem[];

    claimIndicator$ = this.store.select(PayorCenterDetailSelectors.selectPayorClaimIndicator).pipe(
        map(data =>
            data.map(result => ({
                id: result.id,
                code: result.code,
                description: result.description || result.code,
            }))
        )
    );

    data$ = this.store.select(PayorCenterTableSelectors.selectPayorById);
    constructor(
        private fb: FormBuilder,
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private actions$: Actions,
        private auxUtilService: AuxUtilService,
        private titleService: TitleService
    ) {
        const payorId = parseInt(this.route.parent.snapshot.params['id']);
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

        this.payorBilloptionForm = this.fb.group({
            id: [payorId],
            enablebranchbilling: [false],
            printsocsec: [false],
            sendfacility4pos11: [false],
            create0oi: [false],
            npionly: [false],
            realtimeedi: [false],
            use5010: [false],
            useicd10: [false],
            taxable: [false],
            spandates: [false],
            kitbilling: [],
            usepayernpiandtaxid: [false],
            holdfrombilling: [false],
            holdfrombillinguntildate: [],
            holdprimaryifthisissecondary: [false],
            rentcap: [],
            timelyfilingdays: [],
            resubmitdays: [],
            edipassword: [],
            edisender: [],
            edireceiver: [],
            claimindicator: [],
            pos: [],
            tos: [],
            recurcycledays: [],
            testprodedi: [],
            testprod5010: [],
            pwkfaxcover: [],
            usecompanyinfoinbox33and2010ab: [false],
        });
    }

    ngOnInit() {
        this.data$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                const transformedResult = {
                    ...result,
                    holdfrombillinguntildate:
                        result.holdfrombillinguntildate === '1900-01-01T00:00:00'
                            ? ''
                            : result.holdfrombillinguntildate,
                };
                this.payorBilloptionForm.patchValue(transformedResult);
            }
        });

        combineLatest([
            this.claimIndicator$,
            this.payorBilloptionForm
                .get('claimindicator')
                .valueChanges.pipe(startWith(this.payorBilloptionForm.get('claimindicator').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([indicators, selectedIndicator]) => !!indicators),
                tap(([indicators, selectedIndicator]) => {
                    // No additional actions needed for description updates
                })
            )
            .subscribe();
    }

    get selectedClaimIndicator() {
        return this.payorBilloptionForm.get('claimindicator')?.value || '';
    }

    save() {
        let payor = this.payorBilloptionForm.value;

        payor = this.auxUtilService.transFormValuesToUpperCase(payor, ['name', 'address', 'address2', 'billto']);

        payor = this.auxUtilService.cleanData(payor);

        //console.log(payor);

        if (this.payorBilloptionForm.get('holdfrombillinguntildate').value == '') {
            payor['holdfrombillinguntildate'] = null;
        }
        else {
            payor = this.auxUtilService.formatDateFields(payor, ['holdfrombillinguntildate']);
        }

        this.store.dispatch(PayorBillOptionActions.AddPayorBillOption({ payor }));
    }
}
