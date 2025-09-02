import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EmployeeSecurityActions } from 'app/modules/auxilium/employee-center/actions/employee-center-security.action';
import { AppName } from 'app/shared/components/auxilium/appName';
import { AvatarModule } from 'ngx-avatars';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-employee-security-add-acess',
    templateUrl: './employee-security-add-acess.component.html',
    styleUrls: ['./employee-security-add-acess.component.scss'],
    imports: [AvatarModule, MatButton],
})
export class EmployeeSecurityAddAcessComponent {
    allAppNameList = AppName;
    employeeId;

    constructor(
        private store: Store,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _matDialogRef: MatDialogRef<EmployeeSecurityAddAcessComponent>
    ) {
        //console.log('data', data);
        const accessData = data.dynamicComponentData.empAccess;
        const empId = data.dynamicComponentData.empId;
        this.employeeId = empId;
        this.allAppNameList = this.allAppNameList.filter(
            res => !accessData.includes(res.name.toLowerCase()) && res.type === 'public'
        );
    }

    addEmployeeAccess(data) {
        //console.log(data);
        //console.log(this.employeeId);
        let addAccessData = {};
        addAccessData['id'] = 0;
        addAccessData['appName'] = data.name.toLowerCase();
        (addAccessData['role'] = 'CanRead'),
            (addAccessData['isActive'] = true),
            (addAccessData['isDeleted'] = true),
            (addAccessData['employeeid'] = this.employeeId),
            this.store.dispatch(EmployeeSecurityActions.AddNewAcess({ addAccessData }));
        this._matDialogRef.close();
    }
}
