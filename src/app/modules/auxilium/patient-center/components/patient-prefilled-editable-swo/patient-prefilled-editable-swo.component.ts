import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { NgxMaskDirective } from 'ngx-mask';
import { PatientSWOActions } from '../../actions/patient-prefilled-editable-swo.action';
import { PatientSWOSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-patient-prefilled-editable-swo',
    templateUrl: './patient-prefilled-editable-swo.component.html',
    styleUrl: './patient-prefilled-editable-swo.component.scss',
    imports: [ReactiveFormsModule, NgxMaskDirective, NgIf],
})
export class PatientPrefilledEditableSwoComponent implements OnInit {
    @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
    swoForm: FormGroup;
    patientId: number;
    showError: boolean = false;
    errorMessage: string = '';
    patientSWODetails$ = this.store.select(PatientSWOSelectors.selectPatientSWOInfo);

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private auxUtilService: AuxUtilService
    ) {
        this.route.parent.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.patientId = Number(paramMap.get('id'));
            this.store.dispatch(PatientSWOActions.LoadPatientSWO({ patientId: this.patientId }));
        });
    }

    ngOnInit(): void {
        this.swoForm = this.createForm();

        this.patientSWODetails$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                const patchedResult = {
                    sendToName: `${result.phY_FIRSTNAME} ${result.phY_LASTNAME}`,
                    sendToFax: result.fax || '',
                    patientName: `${result.paT_FIRSTNAME} ${result.paT_LASTNAME}`,
                    dob: this.formatDate(result.dob),
                    patientPhone: '',
                    primaryInsurance: result.primarY_INSURANCE,
                    primaryId: result.policy,
                    secondaryInsurance: '',
                    secondaryId: '',
                    physicianName: `${result.phY_FIRSTNAME} ${result.phY_LASTNAME}`,
                    npi: result.npi,
                    physicianAddress: `${result.phY_ADDRESS1} ${result?.phY_ADDRESS2} ${result?.phY_CITY} ${result?.phY_STATE} ${result?.phY_ZIP}`,
                    physicianPhone: result.phone || '',
                    physicianFax: result.fax || '',
                    officeContact: '',
                };

                this.swoForm.patchValue(patchedResult);
            }
        });
    }

    private createForm(): FormGroup {
        return this.fb.group({
            sendToName: [''],
            sendToFax: [''],
            patientName: [''],
            dob: ['', Validators.required],
            patientPhone: [''],
            primaryInsurance: [''],
            primaryId: [''],
            secondaryInsurance: [''],
            secondaryId: [''],
            physicianName: [''],
            npi: [''],
            physicianAddress: [''],
            physicianPhone: [''],
            physicianFax: [''],
            officeContact: [''],
            freestyleLibre3System: [false, Validators.required],
            dexcomG7System: [false, Validators.required],
        });
    }

    openDatePicker(event: Event): void {
        this.dateInput.nativeElement.showPicker();
    }

    // Helper method to format date as 'YYYY-MM-DD' if needed
    private formatDate(date: string): string {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    }

    onSave(): void {
        if (this.swoForm.invalid) {
            return;
        }

        const dobValue = this.swoForm.get('dob')?.value || '';
        let formattedDob = '';
        if (dobValue) {
            const dobDate = new Date(dobValue + 'T00:00:00Z');
            dobDate.setUTCHours(11);
            dobDate.setUTCMinutes(41);
            dobDate.setUTCSeconds(31);
            dobDate.setUTCMilliseconds(681);
            formattedDob = dobDate.toISOString();
        }
        const dto = {
            patientId: this.patientId,
            sendToName: this.swoForm.get('sendToName')?.value || '',
            sendToFax: this.swoForm.get('sendToFax')?.value.toString() || '',
            patientName: this.swoForm.get('patientName')?.value || '',
            dob: formattedDob,
            patientPhone: this.swoForm.get('patientPhone')?.value?.toString() || '',
            primaryInsurance: this.swoForm.get('primaryInsurance')?.value || '',
            primaryId: this.swoForm.get('primaryId')?.value || '',
            secondaryInsurance: this.swoForm.get('secondaryInsurance')?.value || '',
            secondaryId: this.swoForm.get('secondaryId')?.value || '',
            physicianName: this.swoForm.get('physicianName')?.value || '',
            npi: this.swoForm.get('npi')?.value || '',
            physicianAddress: this.swoForm.get('physicianAddress')?.value || '',
            physicianPhone: this.swoForm.get('physicianPhone')?.value || '',
            physicianFax: this.swoForm.get('physicianFax')?.value || '',
            officeContact: this.swoForm.get('officeContact')?.value || '',
            freeStyle3: this.swoForm.get('freestyleLibre3System')?.value,
            dexcomG7: this.swoForm.get('dexcomG7System')?.value,
        };

        if (dto.freeStyle3 == false && dto.dexcomG7 == false) {
            this.showError = true;
            this.errorMessage = 'You must choose a system';
        } else {
            this.showError = false;
            const upperCaseDto = this.auxUtilService.convertObjToUppercase(dto);
            //console.log(upperCaseDto);
            this.store.dispatch(PatientSWOActions.UpdatePatientSWO({ patientSWODetails: upperCaseDto }));
        }
    }
}
