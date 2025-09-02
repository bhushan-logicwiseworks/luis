import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { take } from 'rxjs';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { PatientCenterPhysiciansSelectors } from '../../../reducers';
import { PatientPhysicianListComponent } from '../patient-physician-list/patient-physician-list.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-physician-add',
    templateUrl: './patient-physician-add.component.html',
    styleUrls: ['./patient-physician-add.component.scss'],
    imports: [
        ReactiveFormsModule,
        AuxSelectDropdownComponent,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatIcon,
        MatPrefix,
    ],
})
export class PatientPhysicianAddComponent {
    getPatientId;

    physicianForm: FormGroup;
    orderList = [
        {
            name: 1,
            value: 1,
        },
        {
            name: 2,
            value: 2,
        },
        {
            name: 3,
            value: 3,
        },
        {
            name: 4,
            value: 4,
        },
        {
            name: 5,
            value: 5,
        },
        {
            name: 6,
            value: 6,
        },
        {
            name: 7,
            value: 7,
        },
        {
            name: 8,
            value: 8,
        },
        {
            name: 9,
            value: 9,
        },
        {
            name: 10,
            value: 10,
        },
    ];

    typeList = [
        {
            name: 'RENDERING',
            value: 'RENDERING',
        },
        {
            name: 'REFERRING',
            value: 'REFERRING',
        },
        {
            name: 'BOTH',
            value: 'BOTH',
        },
    ];

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private auxUtilService: AuxUtilService,
        private _matDialogRef: MatDialogRef<PatientPhysicianAddComponent>,
        private searchService: AuxSearchService,
        private route: Router
    ) {
        this.physicianForm = this.fb.group({
            physicianame: ['', [Validators.required]],
            patientId: [''],
            doctorId: [''],
            id: [0],
            order: [1],
            type: [''],
            addUserId: [''],
        });
    }

    ngOnInit(): void {
        this.getPatientId = Number(this.route.url.split('/')[3]);
        this.physicianForm.get('patientId').setValue(this.getPatientId);

        this.store
            .select(PatientCenterPhysiciansSelectors.selectPhysicians)
            .pipe(take(1), untilDestroyed(this))
            .subscribe(physicians => {
                const usedOrders = physicians.map(physician => physician.order);
                this.orderList = this.orderList.filter(option => !usedOrders.includes(option.value));

                // Set default order to the first available option
                if (this.orderList.length > 0) {
                    this.physicianForm.get('order').setValue(this.orderList[0].value);
                }
            });
    }

    openPhysicianList() {
        //   const dialogRef = this.matDialog.open(PatientPhysicianListComponent,{
        //     data: null,
        //     width: '70%'
        //   });
        //   dialogRef.afterClosed().pipe(
        //     untilDestroyed(this)
        // ).subscribe(result => {
        //     if(result){
        //       this.physicianForm.get('doctorId').setValue(result.id)
        //       this.physicianForm.get('physicianame').setValue(result.firstname)
        //     }
        //   })

        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Physician',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientPhysicianListComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.physicianForm.get('doctorId').setValue(result.id);
                    this.physicianForm.get('physicianame').setValue(result.firstname);
                }
            });
    }

    save() {
        if (this.physicianForm.invalid) {
            return;
        }
        let physicians: PatientPhysicianAdd | any = this.physicianForm.value;
        physicians = this.auxUtilService.transFormValuesToUpperCase(physicians, ['type']);
        delete physicians.physicianame;
        this.store.dispatch(PatientCenterPhysiciansActions.AddPatientPhysicians({ physicians }));
        this._matDialogRef.close();
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
