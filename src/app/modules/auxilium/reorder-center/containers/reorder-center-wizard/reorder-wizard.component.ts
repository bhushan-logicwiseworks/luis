import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import icArrowBack from '@iconify/icons-ic/twotone-arrow-back';
import icAutoRenew from '@iconify/icons-ic/twotone-autorenew';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icRule from '@iconify/icons-ic/twotone-rule';
import icSearch from '@iconify/icons-ic/twotone-search';
import IcVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { SearchService } from '../../services/search.service';
import { SecondaryToolbarComponent } from '../../../../../shared/components/secondary-toolbar/secondary-toolbar.component';
import { MatIcon } from '@angular/material/icon';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { ReorderPatientDataSidebarComponent } from '../../components/reorder-patient-data-sidebar/reorder-patient-data-sidebar.component';
import { ReorderWizardMasterComponent } from '../../components/reorder-wizard-master/reorder-wizard-master.component';

@UntilDestroy()
@Component({
    selector: 'ac-reorder-wizard',
    templateUrl: './reorder-wizard.component.html',
    styleUrls: ['./reorder-wizard.component.scss'],
    animations: [fadeInUp400ms, scaleIn400ms, fadeInRight400ms, growIn400ms],
    imports: [
        SecondaryToolbarComponent,
        MatIcon,
        IconModule,
        ReorderPatientDataSidebarComponent,
        ReorderWizardMasterComponent,
    ],
})
export class ReorderWizardComponent implements OnInit, OnDestroy {
    IcVerifiedUser = IcVerifiedUser;
    icSearch = icSearch;

    searchCtrl = new UntypedFormControl();
    icMenu = icMenu;
    icRule = icRule;
    icAutoRenew = icAutoRenew;
    icArrowBack = icArrowBack;

    toggleMenu = false;

    constructor(
        private searchService: SearchService,
        private breakpointObserver: BreakpointObserver,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));
    }

    ngOnDestroy() {
        this.searchService.search.next(null);
    }

    back() {
        //window.history.back();
        this.location.back();
    }
}
