import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import icNotification from '@iconify/icons-ic/twotone-add-alert';
import icCancel from '@iconify/icons-ic/twotone-cancel';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icFileCopy from '@iconify/icons-ic/twotone-file-copy';
import icInfo from '@iconify/icons-ic/twotone-info';
import icFile from '@iconify/icons-ic/twotone-insert-drive-file';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Tag } from 'app/shared/interfaces/user/vault-api.interface';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { take } from 'rxjs/operators';
import * as fromFileActions from '../actions/file.actions';
import { FileSelectors } from '../reducers';
import { EditNotificationComponent } from './edit-notification.component';
import { UpdateElementComponent } from './update-element.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatMenuTrigger, MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MatFormField } from '@angular/material/form-field';
import { DateTimeFormatPipe } from '../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-file-detail',
    templateUrl: './file-detail.component.html',
    styleUrls: ['./file-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateElementComponent],
    imports: [
        MatButton,
        MatTooltip,
        MatIcon,
        PdfViewerModule,
        MatMenuTrigger,
        NgClass,
        UpdateElementComponent,
        MatIconButton,
        IconModule,
        MatFormField,
        MatChipGrid,
        MatChipRow,
        MatChipRemove,
        MatChipInput,
        MatMenu,
        MatMenuContent,
        MatMenuItem,
        AsyncPipe,
        DatePipe,
        DateTimeFormatPipe,
    ],
})
export class FileDetailComponent implements OnInit, OnDestroy {
    @ViewChild('UpdateElementComponent', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;

    tags$ = this.store.select(FileSelectors.selectTags);
    notification$ = this.store.select(FileSelectors.selectNotifications);
    icAdd = icNotification;
    icEdit = icEdit;
    icFileCopy = icFileCopy;
    icCancel = icCancel;
    selectedFile$ = this.store.select(FileSelectors.selectSelectedFile);
    current;
    addOnBlur = true;
    securityLevels = Array.from({ length: 5 }, (_, i) => i);
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, TAB];
    icFile = icFile;
    icInfo = icInfo;

    isEditable = false;

    constructor(
        private store: Store,
        private cd: ChangeDetectorRef,
        private va: VaultApiService,
        private dialog: MatDialog,
        public matDialogRef: MatDialogRef<FileDetailComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private accessUpdateElementComponentFunction: UpdateElementComponent
    ) {
        this.isEditable = data.dynamicComponentData;
    }

    ngOnInit(): void {
        this.selectedFile$.pipe(untilDestroyed(this)).subscribe(file => {
            if (file && this.current !== file?.fileId) {
                this.current = file.fileId;
                this.store.dispatch(fromFileActions.getPreviewFile({ id: file.fileId }));
                this.store.dispatch(fromFileActions.loadTags({ fileId: file.fileId }));
                this.store.dispatch(fromFileActions.loadNotifications({ fileId: file.fileId }));
            }
        });
    }

    saveData() {
        //  this.accessUpdateElementComponentFunction.saveData()
    }

    makeFormEditable() {
        this.isEditable = !this.isEditable;
        if (this.isEditable == true) {
            this.matDialogRef.close();
            const popupData: PopupData = {
                icon: 'mat_outline:assignment',
                iconColor: 'primary',
                title: 'EDIT FILE DETAIL',
                titleColor: 'text-secondary',
                cancelButtonText: 'Cancel',
                saveButtonText: '',
                dynamicComponent: FileDetailComponent,
                dynamicComponentData: true,
                submitFunction: '',
                enterKeyEnabled: true,
            };
            this.dialog
                .open(AuxPopupComponent, {
                    width: '550px',
                    maxWidth: '100%',
                    panelClass: [
                        'animate__animated',
                        'animate__slideInRight',
                        'animated',
                        'ac-commcenter-dialog',
                        'm0-dialog',
                        'custom-container',
                    ],
                    position: {
                        top: 0 + 'px',
                        right: 0 + 'px',
                    },
                    height: '100vh',
                    data: popupData,
                })
                .afterClosed()
                .pipe(untilDestroyed(this))
                .subscribe(result => {
                    this.isEditable = false;
                });
        }
    }

    edit() {
        this.selectedFile$
            .pipe(take(1))
            .subscribe(file => this.store.dispatch(fromFileActions.initUpdateFile({ file })));
    }

    ngOnDestroy(): void {
        this.current = null;
    }

    previewFile() {
        this.store.dispatch(fromFileActions.previewFile({ file: this.current }));
    }

    badgeBg(securityLevel: 0 | 1 | 2 | 3 | 4 | number) {
        return ['bg-green-500', 'bg-green-300', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'][securityLevel];
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.store.dispatch(fromFileActions.addTag({ tag: { fileId: this.current, tag: value.trim() } }));
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag: Tag): void {
        this.store.dispatch(fromFileActions.rmTag({ tag }));
    }

    setLevel(file, securityLevel: number) {
        this.store.dispatch(fromFileActions.updateFile({ file: { ...file, securityLevel }, updateStatus: true }));
        this.matDialogRef.close();
    }

    editNotification() {
        this.notification$.pipe(take(1)).subscribe(e => {
            this.dialog.open(EditNotificationComponent, { data: e, minWidth: '30vw', panelClass: 'dialog-no-close' });
        });
    }

    fileSaved($event) {
        this.closeModal();
    }

    closeModal(): void {
        this.matDialogRef.close();
    }
}
