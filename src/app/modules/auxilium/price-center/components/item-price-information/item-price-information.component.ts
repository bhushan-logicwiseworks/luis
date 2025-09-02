import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientInquiryChangesActions } from 'app/modules/auxilium/patient-center/actions/patient-inquiry-changes.action';
import { PatientInquiryChangesSelectors } from 'app/modules/auxilium/patient-center/reducers';
import { PayorCenterDeatilsActions } from 'app/modules/auxilium/payor-center/actions/payor-details.action';
import { PayorCenterDetailSelectors } from 'app/modules/auxilium/payor-center/reducers';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { map } from 'rxjs';
import { PriceCenterIndividualActions } from '../../actions/price-center-individual.actions';
import { PriceCenterTableActions } from '../../actions/price-center-table.actions';
import { PriceCenterTableSelectors } from '../../reducers';
import { ItemPriceListComponent } from '../item-price-list/item-price-list.component';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect, MatOption, MatSelectTrigger } from '@angular/material/select';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { AsyncPipe } from '@angular/common';
@UntilDestroy()
@Component({
    selector: 'app-item-price-information',
    templateUrl: './item-price-information.component.html',
    styleUrls: ['./item-price-information.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        AuxSelectDropdownComponent,
        MatCheckbox,
        MatSelect,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatSelectTrigger,
        AsyncPipe,
    ],
})
export class ItemPriceInformationComponent {
    editPriceList;
    roundToNearestDollar;
    itemPriceInfo: FormGroup;
    priceCode$ = this.store.select(PayorCenterDetailSelectors.selectPayorPriceCode).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );
    billType$ = this.store.select(PatientInquiryChangesSelectors.selectBillType);
    itemPriceList$ = this.store.select(PriceCenterTableSelectors.selectedItemPriceInfo);
    billTypeDropDown;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        public matDialogRef: MatDialogRef<ItemPriceListComponent>,
        private searchService: AuxSearchService,
        private fb: FormBuilder,
        private store: Store
    ) {
        this.editPriceList = data.dynamicComponentData;
        if (this.editPriceList.itemPriceItem !== undefined) {
            this.store.dispatch(PriceCenterTableActions.loadItemPriceInfo({ id: this.editPriceList.itemPriceItem.id }));
        }
        this.store.dispatch(PayorCenterDeatilsActions.LoadPriceCodeDropDown());
        this.store.dispatch(PatientInquiryChangesActions.BillTypeDropdown());
    }

    ngOnInit() {
        this.itemPriceInfo = this.fb.group({
            pricecode:
                this.editPriceList?.itemPriceItem == undefined
                    ? [this.editPriceList?.pricecode]
                    : [this.editPriceList?.itemPriceItem?.pricecode],
            itemid: [1951],
            id: [0],
            branchid: [0],
            description2:
                this.editPriceList?.itemPriceItem == undefined
                    ? [this.editPriceList?.description]
                    : [this.editPriceList?.itemPriceItem?.description],
            hcpcscode:
                this.editPriceList?.itemPriceItem == undefined
                    ? [this.editPriceList?.hcpcscode]
                    : [this.editPriceList?.itemPriceItem?.hcpcscode],
            rxflag: [''],
            itemcode:
                this.editPriceList?.itemPriceListData == undefined
                    ? [this.editPriceList?.itemcode]
                    : [this.editPriceList?.itemPriceListData?.itemcode],
            description:
                this.editPriceList?.itemPriceListData == undefined
                    ? [this.editPriceList?.description]
                    : [this.editPriceList?.itemPriceListData?.description],
            branchcode:
                this.editPriceList?.itemPriceListData == undefined
                    ? [this.editPriceList?.branchcode]
                    : [this.editPriceList?.itemPriceListData?.branchcode],
            authreq: [''],
            lot: [false],
            norollup: [false],
            roundtonearestdollar: [false],
            spanhold: [false],
            cmnformid: [0],
            quantityallowed: [0],
            effectivedate: [],
            expiredate: [],
            billtype: [],
            rentmod: [],
            rentmod2: [],
            rentmod3: [],
            rentmod4: [],
            rentsubmitted: [0],
            rentallowed: [0],
            rentday: [0],
            rentweek: [0],
            lonrent: [0],
            cappedrentalmonths: [0],
            salemod: [],
            salemod2: [],
            salemod3: [],
            salemod4: [],
            salesubmitted: [0],
            saleallowed: [0],
            tos: [''],
            revenuecode: [''],
            drordergroup: [''],
            dispensingfee: [''],
            adduserid: [''],
            lonsale: [0],
            pos: [],
            quantitydivider: [0],
            markuppercent: [0],
            markupamount: [0],
        });
        this.itemPriceList$.pipe(untilDestroyed(this)).subscribe(res => {
            if (res) {
                this.itemPriceInfo.patchValue(res);
            }
            if (this.editPriceList.itemPriceListData !== undefined) {
                this.itemPriceInfo.get('hcpcscode').setValue(this.editPriceList.itemPriceListData.hcpcscode);
            }
        });

        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
    }

    submitItemPrice() {
        let price = this.itemPriceInfo.value;
        this.store.dispatch(PriceCenterIndividualActions.UpdatePrice({ price }));
        this.matDialogRef.close();
    }

    get selectedBillType() {
        return this.billTypeDropDown.find(res => res.billType === this.itemPriceInfo.get('billtype')?.value)?.billType;
    }

    closeModal() {
        this.matDialogRef.close();
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
