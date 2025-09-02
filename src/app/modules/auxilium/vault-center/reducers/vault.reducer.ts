import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { VaultComplete } from 'app/shared/interfaces/user/vault-api.interface';
import * as VaultActions from '../actions/vault.actions';

export const featureKey = 'vaults';

export interface VaultsState extends EntityState<VaultComplete> {
    loading: boolean;
    error: Error;
    selectedVaultId: number;
    loaded: boolean;
}

export const adapter: EntityAdapter<VaultComplete> = createEntityAdapter<VaultComplete>({
    selectId: model => model.vaultId,
    sortComparer: (a, b) => a.vaultName?.localeCompare(b.vaultName),
});

export const initialState: VaultsState = adapter.getInitialState({
    loading: false,
    error: null,
    selectedVaultId: null,
    loaded: false,
});

export const reducer = createReducer(
    initialState,
    on(VaultActions.ResetVaultState, state => ({ ...state, selectedVaultId: null })),
    on(VaultActions.upsertVault, (state, action) => adapter.upsertOne(action.vault, state)),
    on(VaultActions.addVaults, (state, action) => adapter.addMany(action.vaults, state)),
    on(VaultActions.upsertVaults, (state, action) => adapter.upsertMany(action.vaults, state)),

    on(VaultActions.updateVaults, (state, action) => adapter.updateMany(action.vaults, state)),

    on(VaultActions.deleteVaults, (state, action) => adapter.removeMany(action.ids, state)),

    on(VaultActions.addVault, (state, { vault }) => ({ ...state, loading: true, error: null })),
    on(VaultActions.addVaultSuccess, (state, action) =>
        adapter.addOne(action.vault, { ...state, loading: false, error: null })
    ),
    on(VaultActions.addVaultFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VaultActions.loadVaults, state => ({
        ...state,
        loading: true,
        error: null,
        loaded: false,
        selectedVaultId: null,
    })),
    on(VaultActions.loadVaultsSuccess, (state, action) =>
        adapter.setAll(action.vaults, {
            ...state,
            loading: false,
            error: null,
            loaded: true,
        })
    ),
    on(VaultActions.loadVaultsFailure, (state, error) => ({ ...state, loading: false, ...error, loaded: false })),

    on(VaultActions.updateVault, (state, { vault }) => ({ ...state, error: null, loading: true })),
    on(VaultActions.updateVaultSuccess, (state, action) =>
        adapter.updateOne(action.vault, { ...state, loading: false, error: null, loaded: true })
    ),
    on(VaultActions.updateVaultFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VaultActions.deleteVault, (state, { id }) => ({ ...state, loading: true, error: null })),

    on(VaultActions.deleteVaultSuccess, (state, action) =>
        adapter.removeOne(action.id, { ...state, loading: false, error: null })
    ),

    on(VaultActions.deleteVaultFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VaultActions.setCurrentVault, (state, { id }) => ({ ...state, selectedVaultId: id })),

    on(VaultActions.clearVaults, state => ({ ...state, loading: true, error: null }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const getSelectedVaultId = (state: VaultsState) => state.selectedVaultId;
export const selectLoaded = (state: VaultsState) => state.loaded;
