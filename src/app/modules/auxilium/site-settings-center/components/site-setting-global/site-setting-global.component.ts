import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { hardReset } from '../../../../../reducers/app.actions';

@UntilDestroy()
@Component({
    selector: 'app-site-setting-global',
    templateUrl: './site-setting-global.component.html',
    styleUrls: ['./site-setting-global.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class SiteSettingGlobalComponent implements OnInit {
    constructor(
        private store: Store,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {}

    hardResetApp(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Hard Reset Application',
            message:
                'Are you sure you want to hard reset and logout? This action will clear all data and cannot be undone!',
            actions: {
                confirm: {
                    label: 'Reset & Logout',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    try {
                        localStorage.setItem('app_logout_broadcast', Date.now().toString());
                    } catch {}
                    this.store.dispatch(hardReset());
                    this.router.navigate(['/sign-out']);
                }
            });
    }
}
