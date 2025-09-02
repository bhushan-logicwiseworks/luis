import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipInput } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Attachment } from 'app/shared/interfaces/auxilium/comm-center/attachment.interface';
import { Note } from 'app/shared/interfaces/auxilium/comm-center/note.interface';
import { CommCenterEmailActions } from '../../actions/comm-center-email.actions';
import { CommCenterTableActions } from '../../actions/comm-center-table.actions';
import { CommCenterEmailSelectors } from '../../reducers';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { MatInput } from '@angular/material/input';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuillEditorComponent } from 'ngx-quill';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

enum TabSelection {
    Attachments = 0,
    Message,
    Notes,
}
@UntilDestroy()
@Component({
    selector: 'ac-comm-center-email',
    templateUrl: './comm-center-email.component.html',
    styleUrls: ['./comm-center-email.component.scss'],
    imports: [
        MatTooltip,
        MatIcon,
        MatRipple,
        MatFormField,
        MatLabel,
        MatSelect,
        ReactiveFormsModule,
        MatOption,
        MatSuffix,
        MatProgressSpinner,
        LoadingOverlayComponent,
        MatInput,
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        MatProgressBar,
        PdfViewerModule,
        MatDialogActions,
        QuillEditorComponent,
        MatButton,
        MatDialogClose,
        AsyncPipe,
        TitleCasePipe,
        DateTimeFormatPipe,
    ],
})
export class CommCenterEmailComponent implements OnInit, AfterViewInit, OnDestroy {
    email$ = this.store.select(CommCenterEmailSelectors.selectEmail);
    email: any;

    owners$ = this.store.select(CommCenterEmailSelectors.selectOwners);
    loadingOwners$ = this.store.select(CommCenterEmailSelectors.selectLoadingOwners);
    notes$ = this.store.select(CommCenterEmailSelectors.selectNotes);
    loadingNotes$ = this.store.select(CommCenterEmailSelectors.selectLoadingNotes);
    updatingNotes$ = this.store.select(CommCenterEmailSelectors.selectUpdatingNotes);
    attachments$ = this.store.select(CommCenterEmailSelectors.selectAttachments);
    loadingAttachments$ = this.store.select(CommCenterEmailSelectors.selectLoadingAttachments);
    previewUrl$ = this.store.select(CommCenterEmailSelectors.selectPreviewUrl);

    ownerCtrl = new UntypedFormControl();
    labelCtrl = new UntypedFormControl();

    loading$ = this.store.select(CommCenterEmailSelectors.selectLoading);
    updatingLabel$ = this.store.select(CommCenterEmailSelectors.selectUpdatingLabel);
    updatingOwner$ = this.store.select(CommCenterEmailSelectors.selectUpdatingOwner);

    audioPlaying$ = this.store.select(CommCenterEmailSelectors.selectAudioPlaying);
    audio$ = this.store.select(CommCenterEmailSelectors.selectAudio);

    error$ = this.store.select(CommCenterEmailSelectors.selectError);

    tags = new BehaviorSubject<string[]>([]);
    tags$ = this.tags.asObservable();

    loadingTags$ = this.store.select(CommCenterEmailSelectors.selectLoadingTags);
    updatingTags$ = this.store.select(CommCenterEmailSelectors.selectUpdatingTags);

    attachMentID;
    attachMentName;
    notesForm = new UntypedFormGroup({
        note: new UntypedFormControl(),
    });
    isreadonly: boolean = false;
    quillModules: any = {
        toolbar: false,
    };

    player;
    currentPosition = 0;

    separatorKeysCodes = [ENTER, COMMA];

    @ViewChild('shadowElem') private shadowElem: ElementRef<HTMLElement>;

    selectedTab: TabSelection;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private dialog: MatDialog,
        private matDialogRef: MatDialogRef<CommCenterEmailComponent>,
        private store: Store,
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.email = this.data.dynamicComponentData;

        if (this.isDeletedCompleted()) {
            this.isreadonly = true;
            this.ownerCtrl.disable();
        } else {
            this.ownerCtrl.enable();
        }
        this.store.dispatch(CommCenterEmailActions.LoadEmail({ emailId: this.email.id }));
        this.store.dispatch(CommCenterEmailActions.LoadOwners());
        this.store.dispatch(CommCenterEmailActions.LoadAttachments({ emailId: this.email.id }));
        this.store.dispatch(CommCenterEmailActions.LoadNotes({ emailId: this.email.id }));
        this.store.dispatch(CommCenterEmailActions.LoadTags({ emailId: this.email.id }));

        this.ownerCtrl.setValue(this.email?.owner);
        this.labelCtrl.setValue(this.email?.label);

        this.store
            .select(CommCenterEmailSelectors.selectTagNames)
            .pipe(untilDestroyed(this))
            .subscribe(tags => this.tags.next(tags));
        // this.store.select(CommCenterEmailSelectors.selectEmail).pipe(
        //   untilDestroyed(this)
        // ).subscribe(tags => console.log(tags,"this is a email >>>"));

        /* this.labelCtrl.valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          untilDestroyed(this)
        ).subscribe(label => this.updateLabel(label)); */
        this.ownerCtrl.valueChanges
            .pipe(
                // debounceTime(500),
                untilDestroyed(this)
            )
            .subscribe(owner => this.updateOwner(owner));

        this.audio$.pipe(untilDestroyed(this)).subscribe(e => {
            if (!e && this.player) {
                return this.player.pause();
            }
            if (e) {
                this.player = new Audio(URL.createObjectURL(e));
                this.player.play();
                this.player.addEventListener('timeupdate', x => {});
                this.player.addEventListener('ended', x => {
                    this.store.dispatch(CommCenterEmailActions.StopAudioAttachment());
                });
            }
        });
        this.store
            .select(CommCenterEmailSelectors.selectAttachments)
            .pipe(untilDestroyed(this))
            .subscribe(e => {
                if (e?.length && e[0].type !== 'audio/mpeg') {
                    this.store.dispatch(
                        CommCenterEmailActions.LoadCommDocument({ attachmentId: e[0].id, isPreviewOnly: true })
                    );
                }
            });
    }

    ngOnInit(): void {
        this.getSelectedTabIndex();
        this.attachments$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data.length) {
                this.attachMentID = data[0].id;
                this.attachMentName = data[0].name;
            }
        });
    }

    ngAfterViewInit() {
        if (this.shadowElem) {
            const shadowDom = this.shadowElem.nativeElement.attachShadow({ mode: 'open' });
            const elem = document.createElement('div');
            shadowDom.appendChild(elem);

            this.email$
                .pipe(
                    filter(email => !!email?.body),
                    untilDestroyed(this)
                )
                .subscribe(email => {
                    elem.innerHTML = email.body;
                });
        }
    }

    viewDocument(attachment: Attachment) {
        if (attachment.type === 'audio/mpeg') {
            return this.store.dispatch(CommCenterEmailActions.PlayAudioAttachment({ attachmentId: attachment.id }));
        }
        this.store.dispatch(CommCenterEmailActions.LoadCommDocument({ attachmentId: attachment.id }));
    }

    updateLabel(label: string) {
        this.store.dispatch(
            CommCenterEmailActions.UpdateLabel({
                emailId: this.email.id,
                label,
            })
        );
    }

    updateOwner(owner: string) {
        this.store.dispatch(
            CommCenterEmailActions.UpdateOwner({
                emailId: this.email.id,
                owner,
            })
        );
    }

    addTag(event: MatChipInputEvent) {
        if (!event.value || this.tags.getValue().some(tag => tag === event.value)) {
            if (event.input) {
                event.input.value = null;
            }
            return;
        }

        this.tags.next([...this.tags.getValue(), event.value]);
        this.store.dispatch(
            CommCenterEmailActions.AddTag({
                emailId: this.email.id,
                tag: event.value,
            })
        );

        if (event.input) {
            event.input.value = null;
        }
    }

    deleteTag(tag: string) {
        this.tags.next(this.tags.getValue().filter(t => t !== tag));
        this.store.dispatch(
            CommCenterEmailActions.DeleteTag({
                emailId: this.email.id,
                tag,
            })
        );
    }

    addNote() {
        if (this.notesForm.invalid || !this.notesForm.value.note) {
            return;
        }

        const form: { note: string } = this.notesForm.value;

        const note: Note = {
            emailID: this.email.id,
            description: form.note,
        } as Note;

        this.store.dispatch(CommCenterEmailActions.AddNote({ note }));
        this.notesForm.reset();
        this.store.dispatch(CommCenterEmailActions.LoadNotes({ emailId: this.email.id }));
    }

    editLabel(modal) {
        this.dialog.open(modal, {
            width: '300px',
            maxWidth: '100%',
        });
    }

    close(event: 'true' | 'false', labelValue: string) {
        if (event == 'true' && labelValue) {
            const answer = labelValue.toString().toUpperCase();
            this.updateLabel(answer);
            this.labelCtrl.setValue(answer);
            this._fuseConfirmationService.open({
                title: 'Label saved!',
                message: `
            You entered:
            <pre><code>${answer}</code></pre>
          `,
                actions: {
                    confirm: {
                        label: 'Done',
                    },
                    cancel: {
                        show: false,
                    },
                },
                icon: {
                    name: 'heroicons_outline:check-circle',
                    color: 'success',
                },
            });
        }
    }

    isDeletedCompleted(): boolean {
        if (this.email.isDeleted || this.email.isCompleted) {
            return true;
        } else {
            return false;
        }
    }

    ngOnDestroy() {
        this.store.dispatch(CommCenterEmailActions.SetPreviewUrl({ url: null }));
        if (this.player) {
            this.store.dispatch(CommCenterEmailActions.StopAudioAttachment());
            this.player?.pause();
            this.player = null;
        }
    }

    markDeleted() {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: "You won't be able to revert this!",
            actions: {
                confirm: {
                    label: 'Yes, delete it!',
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });
        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    this.store.dispatch(CommCenterTableActions.DeleteMail({ emailId: this.email.id }));
                    this.matDialogRef.close();
                }
            });
    }

    markCompleted() {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: 'You will flag this item as completed!',
            actions: {
                confirm: {
                    label: "Yes, it's completed!",
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });

        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    this.store.dispatch(CommCenterTableActions.MarkMailAsComplete({ emailId: this.email.id }));
                    this.matDialogRef.close();
                }
            });
    }

    successMessage(title, message) {
        const modal = this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    label: 'OK',
                },
                cancel: {
                    show: false,
                },
            },
            icon: {
                name: 'heroicons_outline:check-circle',
                color: 'success',
            },
        });
        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                this.matDialogRef.close();
            });
    }

    reopenTask() {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: 'You will reopen this completed task!',
            actions: {
                confirm: {
                    label: 'Yes, reopen it!',
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });

        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.store.dispatch(CommCenterTableActions.ReopenCompletedEmail({ emailId: this.email.id }));
                    this.matDialogRef.close();
                }
            });
    }

    openPdf() {
        this.matDialogRef.close('email-section');
        const rediractUrl = this.router.url;
        this.router.navigateByUrl(`${rediractUrl}/link-doc/${this.attachMentID}`);
    }

    downloadPdf() {
        this.store.dispatch(
            CommCenterEmailActions.LoadCommDocument({
                attachmentId: this.attachMentID,
                isPreviewOnly: false,
                attachMentName: this.attachMentName,
            })
        );
    }

    getSelectedTabIndex() {
        switch (this.email.emailSource) {
            case 'TASK':
                this.selectedTab = TabSelection.Notes;
                break;

            case 'EMAIL':
                this.selectedTab = TabSelection.Message;
                break;

            case 'SALES':
                this.selectedTab = TabSelection.Message;
                break;

            case 'FORMSPREE':
                this.selectedTab = TabSelection.Message;
                break;

            case 'SELF':
                this.selectedTab = TabSelection.Message;
                break;

            case 'FAST':
                this.selectedTab = TabSelection.Message;
                break;

            case 'VM':
                this.selectedTab = TabSelection.Attachments;
                break;

            case 'WOUND':
                this.selectedTab = TabSelection.Attachments;
                break;

            case 'APP':
                this.selectedTab = TabSelection.Attachments;
                break;

            default:
                this.selectedTab = TabSelection.Attachments;
        }
    }
}
