import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromInventoryCenterProduct from './inventory-center-details.reducer';
import * as fromInventoryCenterIndividual from './inventory-center-individual.reducer';
import * as fromInventoryCenterLocationList from './inventory-center-location-list.reducer';
import * as fromInventoryCenterPriceList from './inventory-center-price-list.reducer';
import * as fromInventoryCenterTable from './inventory-center-table.reducer';
import * as fromInventoryCenterVendorTable from './inventory-center-vendor-table.reducer';

export const featureKey = 'inventory-center';

export interface InventoryCenterTableState {
    [fromInventoryCenterTable.featureKey]: fromInventoryCenterTable.State;
    [fromInventoryCenterIndividual.featureKey]: fromInventoryCenterIndividual.State;
    [fromInventoryCenterIndividual.featureKey]: fromInventoryCenterIndividual.State;
    [fromInventoryCenterProduct.featureKey]: fromInventoryCenterProduct.State;
    [fromInventoryCenterPriceList.featureKey]: fromInventoryCenterPriceList.State;
    [fromInventoryCenterVendorTable.featureKey]: fromInventoryCenterVendorTable.State;
    [fromInventoryCenterLocationList.featureKey]: fromInventoryCenterLocationList.State;
}

export interface State extends fromRoot.State {
    [featureKey]: InventoryCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: InventoryCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromInventoryCenterTable.featureKey]: fromInventoryCenterTable.reducer,
        [fromInventoryCenterIndividual.featureKey]: fromInventoryCenterIndividual.reducer,
        [fromInventoryCenterProduct.featureKey]: fromInventoryCenterProduct.reducer,
        [fromInventoryCenterPriceList.featureKey]: fromInventoryCenterPriceList.reducer,
        [fromInventoryCenterVendorTable.featureKey]: fromInventoryCenterVendorTable.reducer,
        [fromInventoryCenterLocationList.featureKey]: fromInventoryCenterLocationList.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, InventoryCenterTableState>(featureKey);

/**
 * InventoryCenter Table Selectors
 */
export namespace InventoryCenterTableSelectors {
    const selectInventoryCenterTableState = createSelector(
        selectState,
        state => state[fromInventoryCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectInventoryCenterTableState,
        fromInventoryCenterTable.selectLoading
    );
    export const selectError = createSelector(selectInventoryCenterTableState, fromInventoryCenterTable.selectError);
    export const selectInventory = createSelector(
        selectInventoryCenterTableState,
        fromInventoryCenterTable.selectInventory
    );
}

/**
 * InventoryCenter Individual Selectors
 */
export namespace InventoryCenterIndividualSelectors {
    const selectInventoryCenterIndividualState = createSelector(
        selectState,
        state => state[fromInventoryCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectInventoryCenterIndividualState,
        fromInventoryCenterIndividual.selectLoading
    );
    export const selectInventory = createSelector(
        selectInventoryCenterIndividualState,
        fromInventoryCenterIndividual.selectInventory
    );
    export const selectError = createSelector(
        selectInventoryCenterIndividualState,
        fromInventoryCenterIndividual.selectError
    );
    export const selectBranch = createSelector(
        selectInventoryCenterIndividualState,
        fromInventoryCenterIndividual.selectBranch
    );
}

/**
 * InventoryCenter Product Selectors
 */
export namespace InventoryCenterProductSelectors {
    export const selectInventoryCenterProductState = createSelector(
        selectState,
        state => state[fromInventoryCenterProduct.featureKey]
    );
    export const selectLoading = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectLoading
    );
    export const selectError = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectError
    );

    export const selectProductDetails = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectProductDetails
    );

    export const selectClass = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectClassDropdown
    );
    export const selectShipping = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectShippingDropdown
    );
    export const selectStatus = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectStatusDropdown
    );
    export const selectMake = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectMakeDropdown
    );
    export const selectModal = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectModalDropdown
    );
    export const selectManufacturer = createSelector(
        selectInventoryCenterProductState,
        fromInventoryCenterProduct.selectManufacturerDropdown
    );
}

/**
 * InventoryCenter Price List Selectors
 */
export namespace InventoryCenterPriceListSelectors {
    const selectInventoryCenterPriceListState = createSelector(
        selectState,
        state => state[fromInventoryCenterPriceList.featureKey]
    );

    export const selectLoading = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectLoading
    );
    export const selectError = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectError
    );
    export const selectPriceList = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectPriceList
    );
    export const selectPriceCode = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectPriceCode
    );
    export const selectCMNForms = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectCMNForms
    );
    export const selectPriceById = createSelector(
        selectInventoryCenterPriceListState,
        fromInventoryCenterPriceList.selectPriceById
    );
}
export namespace InventoryCenterVendorTableSelectors {
    const selectInventoryCenterVendorTableState = createSelector(
        selectState,
        state => state[fromInventoryCenterVendorTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectInventoryCenterVendorTableState,
        fromInventoryCenterVendorTable.selectLoading
    );
    export const selectError = createSelector(
        selectInventoryCenterVendorTableState,
        fromInventoryCenterVendorTable.selectError
    );
    export const selectVendorList = createSelector(
        selectInventoryCenterVendorTableState,
        fromInventoryCenterVendorTable.selectVendorList
    );
    export const selectVendorCodes = createSelector(
        selectInventoryCenterVendorTableState,
        fromInventoryCenterVendorTable.selectVendorCodes
    );
}
export namespace InventoryCenterLocationSelectors {
    const selectInventoryCenterLocationState = createSelector(
        selectState,
        state => state[fromInventoryCenterLocationList.featureKey]
    );

    export const selectLoading = createSelector(
        selectInventoryCenterLocationState,
        fromInventoryCenterLocationList.selectLoading
    );
    export const selectError = createSelector(
        selectInventoryCenterLocationState,
        fromInventoryCenterLocationList.selectError
    );
    export const selectLocationList = createSelector(
        selectInventoryCenterLocationState,
        fromInventoryCenterLocationList.selectLocationList
    );
    export const selectLocationBinList = createSelector(
        selectInventoryCenterLocationState,
        fromInventoryCenterLocationList.selectLocationBinList
    );
    export const selectLocationCodeList = createSelector(
        selectInventoryCenterLocationState,
        fromInventoryCenterLocationList.selectLocationCodeList
    );
}
