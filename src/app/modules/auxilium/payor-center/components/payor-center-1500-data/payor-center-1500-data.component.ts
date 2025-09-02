import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { Payor1500DataOptions } from '../../../../../shared/components/auxilium/PayorCenter1500DataComponent.enum';
import { AuxSelectDropdownOption } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown-option.interface';
import { Payor1500DataActions } from '../../actions/payor-1500-data.action';
import { PayorCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';

@UntilDestroy()
@Component({
    selector: 'app-payor-center-1500-data',
    templateUrl: './payor-center-1500-data.component.html',
    styleUrls: ['./payor-center-1500-data.component.scss'],
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatCheckbox,
        MatFormField,
        MatInput,
        AuxSelectDropdownComponent,
    ],
})
export class PayorCenter1500DataComponent implements OnInit {
    payor1500DataForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    payorDetails$ = this.store.select(PayorCenterTableSelectors.selectPayorById);
    box24ivalue: AuxSelectDropdownOption[] = Payor1500DataOptions;
    box32ivalue: AuxSelectDropdownOption[] = Payor1500DataOptions;
    box33ivalue: AuxSelectDropdownOption[] = Payor1500DataOptions;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private route: ActivatedRoute
    ) {
        const payorId = parseInt(this.route.parent.snapshot.params['id']);
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => this.save(),
            },
        ];

        this.payor1500DataForm = this.fb.group({
            id: [payorId],
            // Box 24 I Controls
            usecompanyinfoinbox24i: [false],
            box24iqualifier: [''],
            box24ivalue: [''],

            // Box 31 Signature Controls
            box31doctorfirstname: [''],
            box31doctorlastname: [''],
            box31doctorcredentials: [''],

            // Box 32 Controls
            usepatientinfoinbox32: [false],
            usecompanyinfoinbox32: [false],
            box32bqualifier: [''],
            box32bvalue: [''],

            // Box 33 Controls
            usepayerbranchinfoinhcfa1500box33: [false],
            box33bqualifier: [''],
            box33bvalue: [''],
        });
    }

    ngOnInit(): void {
        this.payorDetails$.pipe(untilDestroyed(this)).subscribe(payorDetails => {
            if (payorDetails) {
                this.payor1500DataForm.patchValue(payorDetails);
            }
        });
    }

    save(): void {
        const payor = this.payor1500DataForm.value;
        const cleanedPayorValues = this.auxUtilService.cleanData(payor);
        const upperCaseValues = this.auxUtilService.transFormValuesToUpperCase(cleanedPayorValues, [
            'box24iqualifier',
            'box24ivalue',
            'firstName',
            'lastName',
            'credentials',
            'box32bqualifier',
            'box32bvalue',
            'box33bqualifier',
            'box33bvalue',
        ]);

        this.store.dispatch(Payor1500DataActions.AddPayor1500Data({ payor: upperCaseValues }));
    }
}
