import { createAction, props } from '@ngrx/store';
import { ConfigurationDisplay } from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';

const LoadConfiguration = createAction('[CodeCenter Table/API] Load Code');
const LoadConfigurationSuccess = createAction(
    '[CodeCenter Table/API] Load Configuration Success',
    props<{ configuration: ConfigurationDisplay }>()
);
const LoadConfigurationFailure = createAction(
    '[CodeCenter Table/API] Load Configuration Failure',
    props<{ error: Error }>()
);

const AddConfiguration = createAction(
    '[ConfigurationCenter Create/API] Add Configuration',
    props<{ configuration: ConfigurationDisplay }>()
);
const AddConfigurationSuccess = createAction(
    '[ConfigurationCenter Create/API] Add Configuration Success',
    props<{ configuration: ConfigurationDisplay }>()
);
const AddConfigurationFailure = createAction(
    '[ConfigurationCenter Create/API] Add Configuration Failure',
    props<{ error: Error }>()
);

export const ConfigurationCenterIndividualActions = {
    LoadConfiguration,
    LoadConfigurationSuccess,
    LoadConfigurationFailure,
    AddConfiguration,
    AddConfigurationSuccess,
    AddConfigurationFailure,
};
