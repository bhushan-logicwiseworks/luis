import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthSelectors } from 'app/reducers';
import { AuthActions } from 'app/reducers/auth.actions';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { ProfilePictureTypeEnum } from 'app/shared/components/auxilium/user-center-profile.enum';
import { BehaviorSubject } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import { GetImage } from '../../../../../shared/pipes/auxilium/aux-getimage.pipe';

@UntilDestroy()
@Component({
    selector: 'user-center-profile-picture',
    templateUrl: './user-center-profile-picture.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        MatIcon,
        MatRipple,
        MatTooltip,
        AsyncPipe,
        GetImage,
    ],
})
export class UserCenterProfilePictureComponent implements OnInit {
    editMode: boolean = false;
    profilePicture$ = this.store.select(AuthSelectors.selectLoggedInUserPic);
    profileBackGroundPicture$ = this.store.select(AuthSelectors.selectLoggedInUserBackgroundPic);
    profilePicData$ = new BehaviorSubject<any>(null);
    profileBackgroundImage$ = new BehaviorSubject<any>(null);
    allowedTypes = ['image/png'];
    profilePicture = ProfilePictureTypeEnum;

    /**
     * Constructor
     */
    constructor(
        private store: Store,
        private _snackBar: MatSnackBar,
        private auxUtilService: AuxUtilService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.profilePicture$.pipe(untilDestroyed(this)).subscribe(result => {
            this.profilePicData$.next(result);
        });

        this.profileBackGroundPicture$.pipe(untilDestroyed(this)).subscribe(result => {
            this.profileBackgroundImage$.next(result);
        });
    }

    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }
    }

    uploadAvatar(fileList: FileList, type): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const file = fileList[0];

        const fileVaild = this.auxUtilService.fileVaildation(file, this.allowedTypes);

        if (fileVaild && !fileVaild.status) {
            this._snackBar.open(fileVaild.message, 'Close', { duration: 2500 });
            return;
        } else {
            this.uploadProfilePictures(file, type);
        }
    }

    uploadProfilePictures(file, type) {
        let data = {};
        const uploadPic = new FormData();
        uploadPic.append('picture', file);
        uploadPic.append('employeePictureType', type);
        const reader = new FileReader();
        reader.readAsDataURL(uploadPic.get('picture') as File);
        reader.onload = () => {
            if (uploadPic.get('employeePictureType') === this.profilePicture.Picture) {
                this.profilePicData$.next(reader.result);
            } else {
                this.profileBackgroundImage$.next(reader.result);
            }
            this.store.dispatch(
                AuthActions.UploadEmployeePic({
                    uploadPic,
                    documentfile: this.profilePicData$.value,
                    backgroundProfileFile: this.profileBackgroundImage$.value,
                })
            );
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
