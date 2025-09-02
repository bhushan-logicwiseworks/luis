import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icTrash from '@iconify/icons-ic/outline-delete';
import icOutlineLibraryAdd from '@iconify/icons-ic/outline-library-add';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icSave from '@iconify/icons-ic/twotone-save';
import { Store } from '@ngrx/store';
import { File as AcFile, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { fileReader } from 'app/shared/utils/fileReader';
import { zip } from 'rxjs';
import { LicenseFileSelectors } from '../../reducers';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIconButton, MatButton } from '@angular/material/button';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ac-license-file-upload',
    templateUrl: './license-file-upload.component.html',
    styleUrls: ['./license-file-upload.component.scss'],
    imports: [
        IconModule,
        MatList,
        MatListItem,
        MatIconButton,
        MatButton,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class LicenseFileUploadComponent implements OnInit {
    icOutlineLibraryAdd = icOutlineLibraryAdd;
    icTrash = icTrash;
    icSave = icSave;
    icFolder = icFolder;
    loading$ = this.store.select(LicenseFileSelectors.selectLoading);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { files: AcFile[]; folder: FolderComplete },
        private ref: MatDialogRef<LicenseFileUploadComponent>,
        private store: Store
    ) {}

    ngOnInit(): void {}

    deleteFile(index: number) {
        this.data.files.splice(index, 1);
    }

    addFilesClicked(e) {
        zip(...Array.from(e.target.files).map((file: File) => fileReader(file))).subscribe(files => {
            this.data.files = this.data.files.concat(...files);
        });
    }

    uploadFiles() {
        const transfer = this.data.files.map(file => ({ ...file, folderId: this.data.folder.folderId }));
        this.ref.close(transfer);
    }
}
