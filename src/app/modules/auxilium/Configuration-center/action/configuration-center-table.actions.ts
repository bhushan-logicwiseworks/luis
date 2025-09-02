import { createAction, props } from '@ngrx/store';
import {
    ConfigurationDisplay,
    GetConfigurationResponse,
} from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';

const ResetState = createAction('[ConfigurationCenter Table/API] Reset Configurations State');
const LoadConfigurations = createAction('[ConfigurationCenter Table/API] Load Codes');
const LoadConfigurationsSuccess = createAction(
    '[ConfigurationCenter Table/API] Load Configurations Success',
    props<{ configurationList: GetConfigurationResponse }>()
);
const LoadConfigurationsFailure = createAction(
    '[ConfigurationCenter Table/API] Load Configurations Failure',
    props<{ error: Error }>()
);

const DeleteConfiguration = createAction(
    '[ConfigurationCenter Delete/API] Delete Configuration',
    props<{ configuration: ConfigurationDisplay }>()
);
const DeleteConfigurationSuccess = createAction('[ConfigurationCenter Delete/API] Delete Configuration Success');
const DeleteConfigurationFailure = createAction(
    '[ConfigurationCenter Delete/API] Delete Configuration Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[ConfigurationCenter Table/API] Refresh');

export const ConfigurationCenterTableActions = {
    LoadConfigurations,
    LoadConfigurationsSuccess,
    LoadConfigurationsFailure,
    Refresh,
    ResetState,
    DeleteConfiguration,
    DeleteConfigurationSuccess,
    DeleteConfigurationFailure,
};
