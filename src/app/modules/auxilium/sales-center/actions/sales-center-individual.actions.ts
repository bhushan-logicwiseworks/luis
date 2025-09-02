import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';

const LoadSalesRep = createAction('[SalesCenter Table/API] Load SalesRep');
const LoadSalesRepSuccess = createAction(
    '[SalesCenter Table/API] Load SalesRep Success',
    props<{ salesrep: SalesRepDisplay }>()
);
const LoadSalesRepFailure = createAction('[SalesCenter Table/API] Load SalesRep Failure', props<{ error: Error }>());

const AddSalesRep = createAction('[SalesRepCenter Create/API] Add SalesRep', props<{ salesrep: SalesRepDisplay }>());
const AddSalesRepSuccess = createAction(
    '[SalesRepCenter Create/API] Add SalesRep Success',
    props<{ salesrep: SalesRepDisplay }>()
);
const AddSalesRepFailure = createAction('[SalesRepCenter Create/API] Add SalesRep Failure', props<{ error: Error }>());

const UpdateSalesRep = createAction(
    '[SalesRepCenter Update/API] Update SalesRep',
    props<{ salesrep: SalesRepDisplay }>()
);
const UpdateSalesRepSuccess = createAction(
    '[SalesRepCenter Update/API] Update SalesRep Success',
    props<{ salesrep: SalesRepDisplay }>()
);
const UpdateSalesRepFailure = createAction(
    '[SalesRepCenter Update/API] Update SalesRep Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[SalesRepCenter API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[SalesRepCenter API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[SalesRepCenter API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

export const SalesCenterIndividualActions = {
    LoadSalesRep,
    LoadSalesRepFailure,
    LoadSalesRepSuccess,
    AddSalesRep,
    AddSalesRepSuccess,
    AddSalesRepFailure,
    UpdateSalesRep,
    UpdateSalesRepSuccess,
    UpdateSalesRepFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
};
