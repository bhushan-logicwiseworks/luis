import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { FileEffects } from './effects/file.effects';
import { FolderTreeEffects } from './effects/folder-tree.effects';
import { FolderEffects } from './effects/folder.effects';
import { VaultEffects } from './effects/vault.effects';
import * as fromFileVault from './reducers';

export default [
    provideState(fromFileVault.featureKey, fromFileVault.reducers),
    provideEffects([VaultEffects, FolderTreeEffects, FileEffects, FolderEffects]),
];
