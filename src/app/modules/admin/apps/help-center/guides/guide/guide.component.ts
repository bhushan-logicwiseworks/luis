import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { GuideCategory } from 'app/modules/admin/apps/help-center/help-center.type';
import { Subject, takeUntil } from 'rxjs';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'help-center-guides-guide',
    templateUrl: './guide.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatAnchor,
        RouterLink,
        MatIcon,
        MatIconButton,
    ],
})
export class HelpCenterGuidesGuideComponent implements OnInit, OnDestroy {
    guideCategory: GuideCategory;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the Guides
        this._helpCenterService.guide$.pipe(takeUntil(this._unsubscribeAll)).subscribe(guideCategory => {
            this.guideCategory = guideCategory;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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
