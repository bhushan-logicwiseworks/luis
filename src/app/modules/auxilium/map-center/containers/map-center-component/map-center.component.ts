import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { stagger40ms } from 'app/core/animations/stagger.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { labelColorDefs } from 'app/shared/constants/aux-color-constants';
import { BehaviorSubject } from 'rxjs';
import { MapCenterTableActions } from '../../actions/map-center-table.actions';
import { MapListTableSelectors } from '../../reducers';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'aux-map-center',
    templateUrl: './map-center.component.html',
    styleUrls: ['./map-center.component.scss'],
    animations: [stagger40ms, fadeInUp400ms],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIcon,
        ReactiveFormsModule,
        MatIconButton,
        MatDrawerContainer,
        MatDrawer,
        AuxSidebarComponent,
        MatDrawerContent,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class MapListSidenavComponent implements OnInit {
    salesreps$ = this.store.select(MapListTableSelectors.selectSalesReps);
    searchCtrl = new UntypedFormControl();
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData$ = new BehaviorSubject<any>([
        {
            title: 'Browse',
            type: 'group',
            children: [
                {
                    title: 'Active Patients',
                    type: 'basic',
                    icon: 'heroicons_outline:user-circle',
                    link: './active',
                },
            ],
        },
        {
            title: 'By Category',
            type: 'group',
            children: [
                {
                    title: 'CGM',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['green'].text,
                    },
                    link: './cgm',
                },
                {
                    title: 'Enternal',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['green'].text,
                    },
                    link: './enteral',
                },
                {
                    title: 'Incontinence',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['green'].text,
                    },
                    link: './incontinence',
                },
            ],
        },
    ]);

    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private searchService: AuxSearchService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));
        this.store.dispatch(MapCenterTableActions.LoadSalesReps());

        this.salesreps$.pipe(untilDestroyed(this)).subscribe(replist => {
            // Populate map with new data
            if (replist.length) {
                const data: FuseNavigationItem = {
                    title: 'By sales category',
                    type: 'group',
                    children: replist.map(result => {
                        return {
                            title: result['name'],
                            type: 'basic',
                            icon: 'heroicons_outline:tag',
                            classes: {
                                icon: labelColorDefs['orange'].text,
                            },
                            link: `./${result['id']}`,
                        };
                    }),
                };
                this.menuData$.next([...this.menuData$.value, data]);
                this.cdr.detectChanges();
            }
        });
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened if
            if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
        });
    }
}
