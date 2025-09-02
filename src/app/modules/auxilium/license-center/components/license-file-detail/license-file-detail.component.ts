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
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import icNotification from '@iconify/icons-ic/twotone-add-alert';
import icCancel from '@iconify/icons-ic/twotone-cancel';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icFileCopy from '@iconify/icons-ic/twotone-file-copy';
import icInfo from '@iconify/icons-ic/twotone-info';
import icFile from '@iconify/icons-ic/twotone-insert-drive-file';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { EditNotificationComponent } from 'app/modules/auxilium/vault-center/components/edit-notification.component';
import { FileDetailComponent } from 'app/modules/auxilium/vault-center/components/file-detail.component';
import { UpdateElementComponent } from 'app/modules/auxilium/vault-center/components/update-element.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Tag } from 'app/shared/interfaces/user/vault-api.interface';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { take } from 'rxjs/operators';
import * as fromFileActions from '../../actions/license-file.actions';
import { LicenseFileSelectors } from '../../reducers';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-license-file-detail',
    templateUrl: './license-file-detail.component.html',
    styleUrls: ['./license-file-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateElementComponent],
    imports: [
        PdfViewerModule,
        MatMenuTrigger,
        NgClass,
        AsyncPipe,
        DatePipe,
        DateTimeFormatPipe,
    ],
})
export class LicenseFileDetailComponent implements OnInit, OnDestroy {
    @ViewChild('UpdateElementComponent', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;

    tags$ = this.store.select(LicenseFileSelectors.selectTags);
    notification$ = this.store.select(LicenseFileSelectors.selectNotifications);
    icAdd = icNotification;
    icEdit = icEdit;
    icFileCopy = icFileCopy;
    icCancel = icCancel;
    selectedFile$ = this.store.select(LicenseFileSelectors.selectSelectedFile);
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
