import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icAdd from '@iconify/icons-ic/outline-add';
import icPencil from '@iconify/icons-ic/round-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icCloudCircle from '@iconify/icons-ic/twotone-snippet-folder';
import { FolderComplete, VaultComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { MatFormField, MatLabel, MatPrefix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IconModule } from '@abhinavakhil/iconify-angular';

@Component({
    selector: 'ac-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        IconModule,
        MatPrefix,
        MatError,
    ],
})
export class CreateComponent implements OnInit {
    icons = {
        Vault: icCloudCircle,
        Folder: icFolder,
    };
    icPencil = icPencil;
    icDelete = icDelete;
    icAdd = icAdd;
    form: UntypedFormGroup = this.fb.group({
        name: [null, Validators.required],
        description: [null],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            toCreate: 'Vault' | 'Folder';
            createInVault?: VaultComplete;
            createInFolder?: FolderComplete;
            vault?: VaultComplete;
            isEdit?: boolean;
        },
        private ref: MatDialogRef<CreateComponent>,
        private fb: UntypedFormBuilder
    ) {}

    ngOnInit(): void {
        if (this.data.isEdit) {
            this.form.patchValue({
                name: this.data.vault.vaultName.toLowerCase(),
                description: this.data.vault.vaultDescription?.toLowerCase(),
            });
        }
    }

    edit() {
        if (this.data.vault) {
            this.ref.close({
                vault: {
                    id: this.data.vault.vaultId,
                    changes: { vaultName: this.form.value.name, vaultDescription: this.form.value.description },
                },
            });
        }
    }

    add() {
        this.ref.close({
            ...this.form.value,
            parentId: this.data.createInFolder?.folderId,
            vaultId: this.data.createInVault?.vaultId,
        });
    }

    delete() {
        this.ref.close({ id: this.data.vault.vaultId, del: true });
    }

    closeModal(): void {
        this.ref.close();
    }
}
