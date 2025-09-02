import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { Payor837DataActions } from '../../actions/payor-837-data.action';
import { PayorCenterDeatilsActions } from '../../actions/payor-details.action';
import { PayorCenterDetailSelectors, PayorCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-payor-center-837-data',
    templateUrl: './payor-center-837-data.component.html',
    styleUrls: ['./payor-center-837-data.component.scss'],
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        AuxSelectDropdownComponent,
        MatFormField,
        MatInput,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class PayorCenter837DataComponent {
    payor837DataForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    payorDetails$ = this.store.select(PayorCenterTableSelectors.selectPayorById);
    clearinghouseList$ = this.store.select(PayorCenterDetailSelectors.selectPayorClearinghouse).pipe(
        map(data =>
            data.map(result => ({
                name: result.name,
                value: result.id,
            }))
        )
    );

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private route: ActivatedRoute
    ) {
        const payorId = parseInt(this.route.parent.snapshot.params['id']);
        this.store.dispatch(PayorCenterDeatilsActions.LoadClearinghouseDropDown());
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
        this.payor837DataForm = this.fb.group({
            id: [payorId],
            // Left column controls
            clearinghouseid: [''],
            clearinghousepayorid: [''],
            securityinfoqualifier: [''],
            securityinfo: [''],
            senderid: [''],
            idqualifier: [''],
            receiverid: [''],
            sendercode: [''],
            receivercode: [''],
            planqualifier: [''],
            submitter: [''],
            plancode: [''],

            // Right column controls
            repetitionseparator: [''],
            componentelementseparator: [''],
            claimfile: [''],
            sendtaxonomy: [false],
            crlf: [false],
            donotsendtaxonomyon837copay: [false],
            usepatientinfoin2310c: [false],
            usediag24easenteredoncharge: [false],
        });
    }

    ngOnInit(): void {
        this.payorDetails$.pipe(untilDestroyed(this)).subscribe(payorDetails => {
            if (payorDetails) {
                this.payor837DataForm.patchValue(payorDetails);
            }
        });
    }

    save() {
        const payor = this.payor837DataForm.value;
        const cleanedPayorValues = this.auxUtilService.cleanData(payor);
        const upperCaseValues = this.auxUtilService.transFormValuesToUpperCase(cleanedPayorValues, [
            'clearinghousepayorid',
            'securityinfoqualifier',
            'securityinfo',
            'senderid',
            'idqualifier',
            'receiverid',
            'sendercode',
            'receivercode',
            'planqualifier',
            'submitter',
            'plancode',
            'repetitionseparator',
            'componentelementseparator',
            'claimfile',
        ]);

        this.store.dispatch(Payor837DataActions.AddPayor837Data({ payor: upperCaseValues }));
    }
}
