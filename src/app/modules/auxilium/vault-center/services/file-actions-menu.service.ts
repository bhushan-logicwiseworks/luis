import { SelectionModel } from '@angular/cdk/collections';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { BehaviorSubject } from 'rxjs';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import * as fromVaultActions from '../actions/vault.actions';
@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class FileActionsMenuService {
    private _config = new OverlayConfig({
        hasBackdrop: true,
        backdropClass: 'bg-transparent',
    });
    overlayRef: OverlayRef;
    type: 'folder' | 'file';
    el: File | FolderComplete;
    selection: SelectionModel<number> = new SelectionModel<number>(true, []);

    search = new BehaviorSubject<string>(null);
    search$ = this.search.asObservable();

    constructor(
        private overlay: Overlay,
        private store: Store
    ) {}

    open(event: MouseEvent, el: File | FolderComplete, type: 'folder' | 'file', component: ComponentType<any>) {
        this.el = el;
        this._config.positionStrategy = this.overlay
            .position()
            .global()
            .left(event.clientX + 'px')
            .top(event.clientY - 20 + 'px');
        this._config.disposeOnNavigation = true;

        this.overlayRef = this.overlay.create(this._config);
        const filePreviewPortal = new ComponentPortal(component);
        this.overlayRef.attach(filePreviewPortal);
        this.type = type;
        this.overlayRef
            .backdropClick()
            .pipe(untilDestroyed(this))
            .subscribe(() => this.closeMenu());
    }

    closeMenu() {
        this.overlayRef.detach();
    }

    previewFile() {
        if (this.type === 'file') {
            this.store.dispatch(fromFileActions.previewFile({ file: this.el as File }));
        }
        this.closeMenu();
    }

    downloadFile() {
        if (this.type === 'file') {
            this.store.dispatch(
                fromFileActions.downloadFile({
                    files: [{ fileId: (this.el as any).fileId } as any],
                })
            );
        }
        this.closeMenu();
    }

    deleteFile() {
        if (this.type === 'file') {
            this.store.dispatch(fromFileActions.initDeleteFile({ file: [this.el as File] }));
        } else {
            this.store.dispatch(fromFolderActions.initDeleteFolder({ folder: [this.el as FolderComplete] }));
        }
        this.closeMenu();
    }

    generateLink() {
        this.store.dispatch(
            fromVaultActions.generateDirectLink({
                resourceType: this.type,
                resource: this.el as unknown,
            })
        );
        this.closeMenu();
    }

    rename() {
        if (this.type === 'file') {
            this.store.dispatch(fromFileActions.initUpdateFile({ file: this.el as any }));
        } else {
            this.store.dispatch(fromFolderActions.initUpdateFolder({ folder: this.el as FolderComplete }));
        }
        this.closeMenu();
    }
}
