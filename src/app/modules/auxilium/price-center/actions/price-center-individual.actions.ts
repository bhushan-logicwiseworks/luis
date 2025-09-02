import { createAction, props } from '@ngrx/store';

const AddPriceRep = createAction('[PriceCenter Create/API] Add Price', props<{ price: any }>());
const AddPriceSuccess = createAction('[PriceCenter Create/API] Add Price Success', props<{ price: any }>());
const AddPriceFailure = createAction('[PriceCenter Create/API] Add Price Failure', props<{ error: Error }>());

const UpdatePrice = createAction('[PriceCenter Update/API] Update Price', props<{ price: any }>());
const UpdatePriceSuccess = createAction('[PriceCenter Update/API] Update Price Success', props<{ price: any }>());
const UpdatePriceFailure = createAction('[PriceCenter Update/API] Update Price Failure', props<{ error: Error }>());

const DeletePrice = createAction('[PriceCenter Delete/API] Delete Price', props<{ price: { id: number } }>());
const DeletePriceSuccess = createAction('[PriceCenter Delete/API] Delete Price Success');
const DeletePriceFailure = createAction('[PriceCenter Delete/API] Delete Price Failure', props<{ error: Error }>());

export const PriceCenterIndividualActions = {
    AddPriceRep,
    AddPriceSuccess,
    AddPriceFailure,
    UpdatePrice,
    UpdatePriceSuccess,
    UpdatePriceFailure,
    DeletePrice,
    DeletePriceSuccess,
    DeletePriceFailure,
};
