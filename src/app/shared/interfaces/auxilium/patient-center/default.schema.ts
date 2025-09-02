import { SchemaConfig } from 'angular-odata';

//#region ODataApi Imports
import { ContainerContainer } from './container.container';
//#endregion

//#region ODataApi SchemaConfig
export const DefaultSchema = {
    namespace: 'Default',
    enums: [],
    entities: [],
    callables: [],
    containers: [ContainerContainer],
} as SchemaConfig;
//#endregion
