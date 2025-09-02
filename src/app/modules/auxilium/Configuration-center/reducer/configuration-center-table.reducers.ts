import { createReducer, on } from '@ngrx/store';
import { GetConfigurationResponse } from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ConfigurationCenterTableActions } from '../action/configuration-center-table.actions';

export const featureKey = 'code-center-table';

export interface State extends LoadingState {
    configurationList: GetConfigurationResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    configurationList: [],
};

export const reducer = createReducer(
    initialState,

    on(ConfigurationCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(ConfigurationCenterTableActions.LoadConfigurations, state => ({ ...initialState, loading: true })),
    on(ConfigurationCenterTableActions.LoadConfigurationsSuccess, (state, { configurationList }) => ({
        ...state,
        loading: false,
        configurationList,
    })),
    on(ConfigurationCenterTableActions.LoadConfigurationsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectConfiguration = (state: State) => state.configurationList;
