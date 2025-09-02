import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fields } from 'app/shared/components/filter-builder/util';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import * as PatientActions from '../actions/patient.actions';

export const patientsFeatureKey = 'patients';

export interface State extends EntityState<PatientEntity> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;
    advancedSearchOpen: boolean;
    visibleColumns: any[];
    screen: string;
    search: any;
    searchValues: any;
}

export const adapter: EntityAdapter<PatientEntity> = createEntityAdapter<PatientEntity>({
    selectId: model => model.Id,
});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    error: null,
    loaded: false,
    advancedSearchOpen: false,
    visibleColumns: fields.filter(e =>
        ['Firstname', 'Lastname', 'Dob', 'Entrydate', 'Patientstatus', 'Patientcategory'].includes(e.prop)
    ),
    screen: null,
    search: null,
    searchValues: null,
});

export const reducer = createReducer(
    initialState,
    on(PatientActions.addPatient, (state, action) => adapter.addOne(action.patients, state)),

    on(PatientActions.addPatients, (state, action) => adapter.addMany(action.patients, state)),
    // on(PatientActions.upsertPatients,
    //   (state, action) => adapter.upsertMany(action.patients, state)
    // ),
    // on(PatientActions.updatePatient,
    //   (state, action) => adapter.updateOne(action.patient, state)
    // ),
    on(PatientActions.updatePatients, (state, action) => adapter.updateMany(action.patients, state)),
    on(PatientActions.deletePatient, (state, action) => adapter.removeOne(action.id, state)),
    on(PatientActions.deletePatients, (state, action) => adapter.removeMany(action.ids, state)),
    on(PatientActions.loadPatients, state => ({ ...state, loading: true, error: null })),
    // on(PatientActions.loadPatientsSuccess,
    //   (state, action) => adapter.setAll(action.patients, {...state, loading: false, error: null, loaded: true})
    // ),
    on(PatientActions.loadPatientsFailure, (state, { error }) => ({ ...state, error, loading: false, loaded: false })),
    on(PatientActions.clearPatients, state => adapter.removeAll(state)),

    on(PatientActions.searchPatients, (state, { search }) => ({
        ...state,
        loading: true,
        error: null,
        advancedSearchOpen: false,
        search,
    })),

    on(PatientActions.setLoading, (state, { loading }) => ({ ...state, loading })),
    on(PatientActions.setAdvancedSearchOpen, (state, { open }) => ({
        ...state,
        advancedSearchOpen: open === undefined ? !state.advancedSearchOpen : open,
    })),
    on(PatientActions.setVisibleColumns, (state, { columns }) => ({ ...state, visibleColumns: columns })),
    on(PatientActions.setScreen, (state, { screen }) => ({ ...state, screen })),
    on(PatientActions.setSearchValues, (state, { values }) => ({ ...state, searchValues: values }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectLoaded = (state: State) => state.loaded;
export const selectAdvancedSearchOpen = (state: State) => state.advancedSearchOpen;
export const selectVisibleColumns = (state: State) => state.visibleColumns;
export const selectScreen = state => state.screen;
export const selectSearchQuery = state => state.search;
export const selectSearchValues = state => state.searchValues;
