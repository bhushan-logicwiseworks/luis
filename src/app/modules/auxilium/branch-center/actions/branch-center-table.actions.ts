import { createAction, props } from '@ngrx/store';
import {
    BranchRepDisplay,
    GetBranchRepsResponse,
} from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';

const ResetState = createAction('[BranchCenter Table/API] Reset BranchReps State');
const LoadBranches = createAction('[BranchCenter Table/API] Load BranchReps');
const LoadBranchesSuccess = createAction(
    '[BranchCenter Table/API] Load Branches Success',
    props<{ branches: GetBranchRepsResponse }>()
);
const LoadBranchesFailure = createAction('[BranchCenter Table/API] Load Branches Failure', props<{ error: Error }>());

const DeleteBranch = createAction('[BranchRepCenter Delete/API] Delete Branch', props<{ dto: BranchRepDisplay }>());
const DeleteBranchSuccess = createAction('[BranchRepCenter Delete/API] Delete Branch Success');
const DeleteBranchFailure = createAction(
    '[BranchRepCenter Delete/API] Delete Branch Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[BranchCenter Table/API] Refresh');

export const BranchCenterTableActions = {
    LoadBranches,
    LoadBranchesSuccess,
    LoadBranchesFailure,
    Refresh,
    ResetState,
    DeleteBranch,
    DeleteBranchSuccess,
    DeleteBranchFailure,
};
