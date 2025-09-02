import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icWarning from '@iconify/icons-ic/twotone-warning';
import { IconModule } from '@abhinavakhil/iconify-angular';

export interface FileMessage {
    message: string;
    obj: any;
}

@Component({
    selector: 'ac-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    imports: [IconModule],
})
export class ConfirmComponent implements OnInit {
    icWarning = icWarning;
    selectedData: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FileMessage,
        public ref: MatDialogRef<ConfirmComponent>
    ) {
        this.selectedData = data;
    }

    ngOnInit(): void {}

    confirmDelete() {
        console.log('confirm delete', this.selectedData.dynamicComponentData.obj);
        this.ref.close(this.selectedData?.dynamicComponentData.obj);
    }
}
