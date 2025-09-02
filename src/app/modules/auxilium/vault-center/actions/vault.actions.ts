import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { FolderComplete, VaultComplete } from 'app/shared/interfaces/user/vault-api.interface';

export const loadVaults = createAction('[Vault/API] Load Vaults');

export const ResetVaultState = createAction('[Vault/API] Reset Vaults');

export const loadVaultsSuccess = createAction('[Vault/API] Load Vaults Success', props<{ vaults: VaultComplete[] }>());

export const loadVaultsFailure = createAction('[Vault/API] Load Vaults Failure', props<{ error: Error }>());

export const setCurrentVault = createAction('[Vault/API] Set Current Vault', props<{ id: number }>());

export const setCurrentVaultSuccess = createAction('[Vault/API] Set Current Vault Success');

export const setCurrentVaultFailure = createAction('[Vault/API] Set Current Vault Failure', props<{ error: Error }>());

export const initAddVault = createAction('[Vault/API] Add Vault Init');
export const addVault = createAction('[Vault/API] Add Vault', props<{ vault: VaultComplete }>());
export const addVaultSuccess = createAction('[Vault/API] Add Vault Success', props<{ vault: VaultComplete }>());
export const addVaultFailure = createAction('[Vault/API] Add Vault Failure', props<{ error: Error }>());

export const updateVault = createAction('[Vault/API] Update Vault', props<{ vault: Update<VaultComplete> }>());
export const updateVaultSuccess = createAction(
    '[Vault/API] Update Vault Success',
    props<{ vault: Update<VaultComplete> }>()
);
export const updateVaultFailure = createAction('[Vault/API] Update Vault Failure', props<{ error: Error }>());

export const deleteVault = createAction('[Vault/API] Delete Vault', props<{ id: string }>());
export const deleteVaultSuccess = createAction('[Vault/API] Delete Vault Success', props<{ id: string }>());
export const deleteVaultFailure = createAction('[Vault/API] Delete Vault Failure', props<{ error: Error }>());

export const upsertVault = createAction('[Vault/API] Upsert Vault', props<{ vault: VaultComplete }>());

export const addVaults = createAction('[Vault/API] Add Vaults', props<{ vaults: VaultComplete[] }>());

export const upsertVaults = createAction('[Vault/API] Upsert Vaults', props<{ vaults: VaultComplete[] }>());

export const updateVaults = createAction('[Vault/API] Update Vaults', props<{ vaults: Update<VaultComplete>[] }>());

export const deleteVaults = createAction('[Vault/API] Delete Vaults', props<{ ids: string[] }>());

export const clearVaults = createAction('[Vault/API] Clear Vaults');

export const generateDirectLink = createAction(
    '[Vault/API] Generate Direct Link',
    props<{ resourceType: 'file' | 'folder'; resource: File | FolderComplete }>()
);
