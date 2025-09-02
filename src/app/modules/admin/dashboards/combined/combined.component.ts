import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthSelectors } from 'app/reducers';
import { CombinedService } from './combined.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { GlobalComponent } from './container/global/global.component';
import { MonthlyComponent } from './container/monthly/monthly.component';
import { DailyComponent } from './container/daily/daily.component';
import { GoalsComponent } from './container/goals/goals.component';
import { AsyncPipe } from '@angular/common';
import { GetImage } from '../../../../shared/pipes/auxilium/aux-getimage.pipe';

enum TabSelection {
    Global,
    Monthly,
    Daily,
    Combined,
    Goals,
}

@UntilDestroy()
@Component({
    selector: 'project',
    templateUrl: './combined.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        TranslocoDirective,
        MatIcon,
        MatButton,
        MatRipple,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatTabGroup,
        MatTab,
        MatTabContent,
        GlobalComponent,
        MonthlyComponent,
        DailyComponent,
        GoalsComponent,
        AsyncPipe,
        GetImage,
    ],
})
export class CombinedComponent implements OnInit, AfterViewInit {
    selectedProject: string = 'ACENTUS';
    name$ = this.store.select(AuthSelectors.selectName);
    profilePicture$ = this.store.select(AuthSelectors.selectLoggedInUserPic);
    selectedTab = TabSelection.Goals;

    /**
     * Constructor
     */
    constructor(
        private combinedService: CombinedService,
        private _router: Router,
        private store: Store,
        public cdr: ChangeDetectorRef
    ) {}
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * Settings
     */
    settings(): void {
        this._router.navigate(['/user-center/settings']);
    }
}
