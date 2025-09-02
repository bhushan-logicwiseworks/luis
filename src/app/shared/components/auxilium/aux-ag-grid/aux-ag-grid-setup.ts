import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';
ModuleRegistry.registerModules([AllEnterpriseModule]);

import { provideGlobalGridOptions } from 'ag-grid-community';
provideGlobalGridOptions({ theme: 'legacy' });
