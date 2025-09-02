import { createAction, props } from '@ngrx/store';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetSalesRepsResponse, SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';

const ResetState = createAction('[SalesCenter Table/API] Reset SalesReps State');
const LoadSalesReps = createAction('[SalesCenter Table/API] Load SalesReps', props<{ filter: string }>());
const LoadSalesRepsSuccess = createAction(
    '[SalesCenter Table/API] Load SalesReps Success',
    props<{ salesreps: GetSalesRepsResponse }>()
);
const LoadSalesRepsFailure = createAction('[SalesCenter Table/API] Load SalesReps Failure', props<{ error: Error }>());

const DeleteSalesRep = createAction('[SalesRepCenter Delete/API] Delete SalesRep', props<{ dto: SalesRepDisplay }>());
const DeleteSalesRepSuccess = createAction('[SalesRepCenter Delete/API] Delete SalesRep Success');
const DeleteSalesRepFailure = createAction(
    '[SalesRepCenter Delete/API] Delete SalesRep Failure',
    props<{ error: Error }>()
);
const LoadSalesById = createAction('[SalesRepCenter Table/API] Load SalesRep By Id', props<{ id: number }>());
const LoadSalesByIdSuccess = createAction(
    '[SalesRepCenterTable/ API] Load SalesRep By Id Success',
    props<{ salesRepById: SalesRepDisplay }>()
);
const LoadSalesByIdFailure = createAction(
    '[SalesRepCenter Table/API] Load SalesRep By Id Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[SalesRepCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[SalesRepCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[SalesRepCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[SalesCenter Table/API] Refresh');

export const SalesCenterTableActions = {
    LoadSalesReps,
    LoadSalesRepsSuccess,
    LoadSalesRepsFailure,
    Refresh,
    ResetState,
    DeleteSalesRep,
    DeleteSalesRepSuccess,
    DeleteSalesRepFailure,
    LoadSalesById,
    LoadSalesByIdSuccess,
    LoadSalesByIdFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
};
