import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
} from '@angular/core';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';

import icCancel from '@iconify/icons-ic/twotone-cancel';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icSave from '@iconify/icons-ic/twotone-save';

import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { IconModule } from '@abhinavakhil/iconify-angular';

export interface EditData {
    type: string;
    element: File | FolderComplete;
}

@Component({
    selector: 'ac-update-element',
    templateUrl: './update-element.component.html',
    styleUrls: ['./update-element.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        MatButton,
        IconModule,
    ],
})
export class UpdateElementComponent implements OnInit, OnChanges {
    icEdit = icEdit;
    icSave = icSave;
    icCancel = icCancel;
    form: FormGroup;
    @Input() updatedFileData: { element: File; type: 'file' | 'folder' };
    @Output() closeModal = new EventEmitter<boolean>(false);

    constructor(
        @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private fb: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        @Optional() public matBottomSheetRef: MatBottomSheetRef<UpdateElementComponent>,
        private store: Store
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.initForm();
        }
    }

    initForm() {
        this.form = this.fb.group({
            name: [
                (this.data.element as File).displayName || (this.data.element as FolderComplete).folderName,
                Validators.required,
            ],
            description: [
                (this.data.element as File).description || (this.data.element as FolderComplete).folderDescription,
            ],
            createdBy: [this.data.element.createdBy],
            expirationDate: [(this.data.element as File).expirationDate],
            startDate: [(this.data.element as File).startDate],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.updatedFileData.currentValue && changes.updatedFileData.currentValue.element) {
            this.data = changes.updatedFileData.currentValue;
            this.initForm();
        }
    }

    saveData() {
        if (this.data.type === 'file') {
            let fileData = {
                ...this.data.element,
                displayName: this.form.value.name,
                description: this.form.value.description,
                createdBy: this.form.value.createdBy,
                expirationDate: this.form.value.expirationDate,
                startDate: this.form.value.startDate,
            };

            // Transform inputs to uppercase
            fileData = this.auxUtilService.transFormValuesToUpperCase(fileData, [
                'description',
                'displayName',
                'originalName',
                'fileName',
            ]);
            fileData = this.auxUtilService.cleanData(fileData);
            if (this.matBottomSheetRef) {
                return this.matBottomSheetRef.dismiss(fileData);
            } else {
                this.store.dispatch(fromFileActions.updateFile({ file: fileData, updateStatus: false }));
                this.closeModal.emit(true);
                return false;
            }
        }
        let folderData = {
            ...this.data.element,
            folderName: this.form.value.name,
            folderDescription: this.form.value.description,
            createdBy: this.form.value.createdBy,
        };

        // Transform inputs to uppercase
        folderData = this.auxUtilService.transFormValuesToUpperCase(folderData, [
            'description',
            'folderName',
            'folderDescription',
        ]);
        folderData = this.auxUtilService.cleanData(folderData);
        if (this.matBottomSheetRef) {
            return this.matBottomSheetRef.dismiss(folderData);
        } else {
            this.store.dispatch(fromFolderActions.updateFolder({ folder: folderData }));
            return false;
        }
    }

    close() {
        this.matBottomSheetRef.dismiss();
    }

    onDateChange(event, formControlName) {
        this.form = this.auxUtilService.manuallyCheckDateValid(event.target.value, this.form, formControlName);
    }
}
