import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthSelectors } from 'app/reducers';
import { ProfilePictureTypeEnum } from 'app/shared/components/auxilium/user-center-profile.enum';
import { AsyncPipe } from '@angular/common';
import { GetImage } from '../../../../../shared/pipes/auxilium/aux-getimage.pipe';

@UntilDestroy()
@Component({
    selector: 'app-user-center-profile-page',
    templateUrl: './user-center-profile-page.component.html',
    styleUrls: ['./user-center-profile-page.component.scss'],
    imports: [AsyncPipe, GetImage],
})
export class UserCenterProfilePageComponent {
    loggedInUser;
    loggedInUserDetails$ = this.store.select(AuthSelectors.selectLoggedInUser);
    profilePicture$ = this.store.select(AuthSelectors.selectLoggedInUserPic);
    profileBackGroundPicture$ = this.store.select(AuthSelectors.selectLoggedInUserBackgroundPic);
    profilePicture = ProfilePictureTypeEnum;

    /**
     * Constructor
     */
    constructor(private store: Store) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.loggedInUserDetails$.pipe(untilDestroyed(this)).subscribe(loggedInUserDetails => {
            if (loggedInUserDetails) {
                this.loggedInUser = loggedInUserDetails;
            }
        });
    }
}
