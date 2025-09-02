import { createAction, props } from '@ngrx/store';
import { SearchCriteria } from 'app/shared/interfaces/auxilium/work-order-center/search-criteria.interface';
import {
    GetWorkOrderRepsResponse,
    WorkOrderDisplay,
} from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';

const ResetState = createAction('[WorkCenter Table/API] Reset WorkorderReps State');
const LoadWorkReps = createAction('[WorkCenter Table/API] Load WorkorderReps', props<{ filter: string }>());
const LoadWorkRepsSuccess = createAction(
    '[WorkCenter Table/API] Load WorkorderReps Success',
    props<{ workreps: GetWorkOrderRepsResponse }>()
);
const LoadWorkRepsFailure = createAction('[WorkCenter Table/API] Load WorkReps Failure', props<{ error: Error }>());

const DeleteWorkRep = createAction('[WorkRepCenter Delete/API] Delete WorkRep', props<{ dto: WorkOrderDisplay }>());
const DeleteWorkRepSuccess = createAction('[WorkRepCenter Delete/API] Delete WorkRep Success');
const DeleteWorkRepFailure = createAction(
    '[WorkRepCenter Delete/API] Delete WorkRep Failure',
    props<{ error: Error }>()
);

const DeleteMultipleWorkRep = createAction(
    '[WorkRepCenter Delete/API] Delete Multiple WorkRep',
    props<{ ids: number[] }>()
);
const DeleteMultipleWorkRepSuccess = createAction('[WorkRepCenter Delete/API] Delete Multiple WorkRep Success');
const DeleteMultipleWorkRepFailure = createAction(
    '[WorkRepCenter Delete/API] Delete WorkRep Multiple Failure',
    props<{ error: Error }>()
);

const SearchWorkOrderEpoSent = createAction(
    '[WorkOrderCenter Table/API] Search Work Order EPO Sent',
    props<{ criteria: SearchCriteria }>()
);
const SearchWorkOrderEpoSentSuccess = createAction(
    '[WorkOrderCenter Table/API] Search Work Order EPO Sent Success',
    props<{ workreps: WorkOrderDisplay[] }>()
);
const SearchWorkOrderEpoSentFailure = createAction(
    '[WorkOrderCenter Table/API] Search Work Order EPO Sent Failure',
    props<{ error: Error }>()
);

const SearchWorkOrderMonthlyMarker = createAction(
    '[WorkOrderCenter Table/API] Search Work Order Monthly Marker',
    props<{ criteria: SearchCriteria }>()
);
const SearchWorkOrderMonthlyMarkerSuccess = createAction(
    '[WorkOrderCenter Table/API] Search Work Order Monthly Marker Success',
    props<{ workreps: WorkOrderDisplay[] }>()
);
const SearchWorkOrderMonthlyMarkerFailure = createAction(
    '[WorkOrderCenter Table/API] Search Work Order Monthly Marker Failure',
    props<{ error: Error }>()
);

const SetWorkOrderSearch = createAction(
    '[WorkOrderCenter Table/API] Set Work Order Search',
    props<{ criteria: SearchCriteria | null }>()
);

const WOGroupEdit = createAction('[WorkOrder GroupEdit/API] Edit GroupWorkOrder', props<{ patientData: any }>());
const WOGroupEditSuccess = createAction('[WorkOrder GroupEdit/API] WorkOrder GroupEdit Success');
const WOGroupEditFailure = createAction(
    '[WorkOrder GroupEdit/API] WorkOrder GroupEdit Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[WorkRepCenter Delete/API] Refresh');

export const WorkOrderCenterTableActions = {
    LoadWorkReps,
    LoadWorkRepsSuccess,
    LoadWorkRepsFailure,
    Refresh,
    ResetState,
    DeleteWorkRep,
    DeleteWorkRepSuccess,
    DeleteMultipleWorkRep,
    DeleteMultipleWorkRepSuccess,
    DeleteMultipleWorkRepFailure,
    DeleteWorkRepFailure,
    SearchWorkOrderEpoSent,
    SearchWorkOrderEpoSentSuccess,
    SearchWorkOrderEpoSentFailure,
    SearchWorkOrderMonthlyMarker,
    SearchWorkOrderMonthlyMarkerSuccess,
    SearchWorkOrderMonthlyMarkerFailure,
    SetWorkOrderSearch,
    WOGroupEdit,
    WOGroupEditSuccess,
    WOGroupEditFailure,
};
