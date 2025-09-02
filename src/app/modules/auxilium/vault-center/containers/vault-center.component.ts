import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icSearch from '@iconify/icons-ic/twotone-search';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleInOutAnimation } from 'app/core/animations/scale-in-out.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import * as fromVaultActions from '../actions/vault.actions';
import { FileSelectors, VaultsSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { FileVaultActionBarComponent } from '../components/vault-center-action-bar.component';
import { FileListBreadcrumbsComponent } from '../components/file-list-breadcrumbs.component';
import { FileVaultFileListComponent } from './vault-center-file-list.component';
import { FullScreenDropzoneComponent } from '../../../../shared/components/full-screen-dropzone/full-screen-dropzone.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-vault-center',
    templateUrl: './vault-center.component.html',
    styleUrls: ['./vault-center.component.scss'],
    animations: [fadeInUp400ms, scaleIn400ms, fadeInRight400ms, scaleInOutAnimation, growIn400ms],
    imports: [
        MatIcon,
        ReactiveFormsModule,
        MatIconButton,
        MatDrawerContainer,
        MatDrawer,
        AuxSidebarComponent,
        MatDrawerContent,
        FileVaultActionBarComponent,
        FileListBreadcrumbsComponent,
        FileVaultFileListComponent,
        FullScreenDropzoneComponent,
        AsyncPipe,
    ],
})
export class FileVaultComponent implements OnInit, OnDestroy {
    icMenu = icMenu;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    icFolder = icFolder;
    icSearch = icSearch;
    selectedVaultId: number = -1;
    selectedFile$ = this.store.select(FileSelectors.selectSelectedFile);
    allVaults = [];
    searchCtrl = new UntypedFormControl();
    toggleMenu = false;
    menuData$: BehaviorSubject<FuseNavigationItem[]> = new BehaviorSubject([
        {
            title: 'Actions',
            subtitle: 'Add Patient',
            type: 'group',
            children: [
                {
                    title: 'Add Vault',
                    type: 'basic',
                    icon: 'mat_outline:account_balance',
                    function: () => {
                        this.addVault();
                    },
                },
                {
                    title: 'Add Folder',
                    type: 'basic',
                    icon: 'mat_outline:create_new_folder',
                    function: () => {
                        this.addFolder();
                    },
                },
                {
                    title: 'Add File',
                    type: 'basic',
                    icon: 'mat_outline:file_upload',
                    function: () => {
                        this.addFile();
                    },
                },
            ],
        },
        {
            title: 'Vaults',
            type: 'group',
            children: [],
        },
    ]);
    vaults$ = this.store.select(VaultsSelectors.selectAll);
    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private fileActions: FileActionsMenuService,
        private cdr: ChangeDetectorRef,
        private serchService: FileActionsMenuService
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.serchService.search.next(value));
        // this.route.params.pipe(switchMap(params => this.checkStore(params))).subscribe();
        this.vaults$.pipe(untilDestroyed(this)).subscribe(result => {
            const hasActiveVault = this.selectedVaultId && this.selectedVaultId !== -1 ? true : false;
            const menuData = result.map(res => {
                return {
                    title: res.vaultName,
                    type: 'basic',
                    icon: 'heroicons_outline:folder',
                    active: hasActiveVault ? Number(res.vaultId) === this.selectedVaultId : false,
                    function: () => {
                        this.fileActions.selection.clear();
                        this.store.dispatch(fromVaultActions.setCurrentVault({ id: res.vaultId }));
                        this.router.navigateByUrl(`/centers/vault-center/${res.vaultId}`);
                    },
                };
            });
            const existingMenuData = this.menuData$.getValue();
            existingMenuData[1] = {
                ...existingMenuData[1],
                children: cloneDeep(menuData) as FuseNavigationItem[],
            };
            this.allVaults = result;
            this.menuData$.next(cloneDeep(existingMenuData));
        });

        combineLatest([this.menuData$, this.store.select(VaultsSelectors.selectSelectedVaultId)])
            .pipe(
                untilDestroyed(this),
                filter(([data]) => data[1].children.length > 0)
            )
            .subscribe(([menuData, selectedVaultId]) => {
                if (selectedVaultId !== this.selectedVaultId) {
                    this.selectVault(selectedVaultId);
                }
            });
    }

    // select vault based on params
    selectVault(vaultId: number) {
        // set as selected
        this.selectedVaultId = vaultId;
        const getActivatedVault = this.allVaults.findIndex(res => Number(res.vaultId) === this.selectedVaultId);
        if (getActivatedVault > -1) {
            const existingMenuData = this.menuData$.getValue();
            const updatedChildren = existingMenuData[1].children.map((result, index) => {
                return {
                    ...result,
                    active: index === getActivatedVault,
                };
            });
            existingMenuData[1] = {
                ...existingMenuData[1],
                children: cloneDeep(updatedChildren) as FuseNavigationItem[],
            };
            this.menuData$.next(cloneDeep(existingMenuData));
            this.cdr.detectChanges();
        }
    }

    changeFile(files) {
        this.store.dispatch(fromFileActions.initAddFiles({ files }));
    }

    ngOnDestroy(): void {}

    checkStore(params): Observable<boolean> {
        return this.store.select(VaultsSelectors.selectLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromVaultActions.loadVaults());
                }
            }),
            switchMap(loaded => {
                if (Number(params['vaultId'])) {
                    this.store.dispatch(fromVaultActions.setCurrentVault({ id: Number(params['vaultId']) }));
                    this.selectVault(Number(params['vaultId']));
                    return of(loaded);
                }
            }),
            filter(loaded => !!loaded),
            take(1)
        );
    }

    addVault() {
        this.store.dispatch(fromVaultActions.initAddVault());
    }

    addFolder() {
        this.store.dispatch(fromFolderActions.initAddFolder());
    }

    addFile() {
        this.store.dispatch(fromFileActions.initAddFiles({ files: [] }));
    }
}
