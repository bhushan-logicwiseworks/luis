import { createReducer, on } from '@ngrx/store';
import { GetCodesResponse } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import { ConfigurationDisplay } from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ConfigurationCenterIndividualActions } from '../action/configuration-center-individual.actions';

export const featureKey = 'code-center-individual';

export interface State extends LoadingState {
    configurationRep: GetCodesResponse;
    configuration: ConfigurationDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    configuration: null,
    configurationRep: [],
};

export const reducer = createReducer(
    initialState,

    on(ConfigurationCenterIndividualActions.LoadConfiguration, state => ({ ...state, loading: true })),
    on(ConfigurationCenterIndividualActions.LoadConfigurationSuccess, (state, { configuration: configuration }) => ({
        ...state,
        loading: false,
        configuration,
    })),
    on(ConfigurationCenterIndividualActions.LoadConfigurationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectCodeRep = (state: State) => state.configuration;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.configurationRep;
