import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';

@Injectable({
    providedIn: 'root',
})
export class DragDropService {
    _expand = new Subject();

    expand = this._expand.asObservable();
    draggedElement;
    dropOn;

    constructor(private store: Store) {}

    startDragging(element) {
        this._expand.next(true);
        this.draggedElement = element;
    }

    stopDragging() {
        this._expand.next(false);
        // console.log(this.dropOn?.folder?.folderId, this.draggedElement?.folderId);
        if (!this.dropOn) {
            return;
        }
        // console.log(this.draggedElement);
        if (this.draggedElement?.folderParentId) {
            this.draggedElement.folderParentId = String(this.dropOn?.folder.folderId);
            return this.store.dispatch(fromFolderActions.updateFolder({ folder: this.draggedElement }));
        }
        this.draggedElement.folderId = this.dropOn.folder.folderId;
        this.store.dispatch(fromFileActions.updateFile({ file: this.draggedElement, updateStatus: false }));
        this.draggedElement = null;
    }

    updateNewFolder(el: any) {
        this.dropOn = el;
    }
}
