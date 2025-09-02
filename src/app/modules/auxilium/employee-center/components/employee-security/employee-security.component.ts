import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SecurityRole } from 'app/shared/components/auxilium/employee-security-role.enum';
import { EmployeeSecurityDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee-center-security.interface';
import { AvatarModule } from 'ngx-avatars';
import { Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { EmployeeCenterDeatilsActions } from '../../actions/employee-center-details.action';
import { EmployeeSecurityActions } from '../../actions/employee-center-security.action';
import { EmployeeSecuritySelectors } from '../../reducers';
import { EmployeeSecurityAddAcessComponent } from './component/employee-security-add-acess/employee-security-add-acess.component';

@UntilDestroy()
@Component({
    selector: 'ac-employee-security',
    templateUrl: './employee-security.component.html',
    styleUrls: ['./employee-security.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    imports: [
        FuseHorizontalNavigationComponent,
        AvatarModule,
        MatFormField,
        MatSelect,
        MatSelectTrigger,
        MatOption,
        MatIconButton,
        MatIcon,
    ],
})
export class EmployeeSecurityComponent implements OnInit {
    employeeId;
    employeeAccess$ = this.store.select(EmployeeSecuritySelectors.selectEmployeeAccessByFilter);
    securityRole = SecurityRole;
    emplyeeAcessData;
    toolbarData: FuseNavigationItem[];
    roles: any[] = [
        {
            label: this.securityRole.CanRead,
            value: 'CanRead',
        },
        {
            label: this.securityRole.CanWrite,
            value: 'CanWrite',
        },
        {
            label: this.securityRole.CanAdmin,
            value: 'CanAdmin',
        },
    ];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private actions$: Actions,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router
    ) {
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
            {
                title: 'Add Access',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.openAddAccessModal(this.employeeId);
                },
            },
        ];
    }

    ngOnInit(): void {
        const id = Number(this.router.url.split('/')[3]);
        this.employeeId = id;
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(EmployeeCenterDeatilsActions.LoadEmployeeDetails({ id: id }));
                this.store.dispatch(EmployeeSecurityActions.getEmployeeAccess({ id }));
            });

        this.actions$
            .pipe(ofType(EmployeeSecurityActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.employeeAccess$.pipe(untilDestroyed(this)).subscribe(res => {
            this.emplyeeAcessData = res;
        });
    }

    changeEmployeeRole(employeeData: EmployeeSecurityDisplay, role: string) {
        const employeeAccess = {
            ...employeeData,
            role,
        };
        this.store.dispatch(EmployeeSecurityActions.saveEmployeeAccess({ employeeAccess }));
    }

    openAddAccessModal(id) {
        const data = {
            empAccess: this.emplyeeAcessData.map(res => res.appName.toLowerCase()),
            empId: id,
        };
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add Access',
            cancelButtonText: 'Cancel',
            saveButtonText: 'save',
            dynamicComponent: EmployeeSecurityAddAcessComponent, // Component you want to load dynamically
            dynamicComponentData: data,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '600px',
            height: '800px',
            data: popupData,
            backdropClass: 'cust-access',
        });
        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    deleteEmployeeAccess(employeeData: EmployeeSecurityDisplay) {
        const employeeAccess = {
            ...employeeData,
            isDeleted: true,
        };

        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Access',
            message: 'Are you sure you want to delete this access? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the Employee Access
                    this.store.dispatch(EmployeeSecurityActions.deleteEmployeeAccess({ employeeData: employeeAccess }));
                }
            });
    }

    save() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        });
    }
}
