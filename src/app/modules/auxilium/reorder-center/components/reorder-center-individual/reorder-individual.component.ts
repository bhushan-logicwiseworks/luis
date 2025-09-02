import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import icClose from '@iconify/icons-ic/twotone-close';
import IcVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import { ReorderCenterService } from 'app/core/services/reorder-center.service';
import { ContactResult } from 'app/shared/interfaces/auxilium/patient-center/patient-next-order-summary.interface';
import Swal from 'sweetalert2';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatError } from '@angular/material/form-field';

@Component({
    selector: 'ac-reorder-individual',
    templateUrl: './reorder-individual.component.html',
    styleUrls: ['./reorder-individual.component.scss'],
    imports: [
        MatDialogTitle,
        MatIconButton,
        MatDialogClose,
        MatIcon,
        IconModule,
        ReactiveFormsModule,
        CdkScrollable,
        MatDialogContent,
        MatError,
        MatDialogActions,
        MatButton,
    ],
})
export class ReorderIndividualComponent implements OnInit {
    icClose = icClose;
    IcVerifiedUser = IcVerifiedUser;
    form: UntypedFormGroup = new UntypedFormGroup({});

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { patientId: string; type: string },
        private reordersService: ReorderCenterService,
        private fb: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialogRef: MatDialogRef<any>
    ) {
        this.form = fb.group({
            note: ['', [Validators.required]],
        });
    }

    get f() {
        return this.form.controls;
    }

    get pid() {
        return this.data.patientId;
    }

    ngOnInit(): void {
        switch (this.data.type) {
            case 'NA':
                // no answer
                this.form.controls['note'].setValue('ATTEMPTED CONTACT WITH PATIENT, NO ANSWER');
                break;
            case 'VM':
                // voice mail
                this.form.controls['note'].setValue(
                    'ATTEMPTED CONTACT WITH PATIENT, LEFT VOICE MAIL TO RETURN CALL FOR REORDER'
                );
                break;
            case 'CMCP':
                // contact made, cannot proceed
                this.form.controls['note'].setValue('CONTACT WITH PATIENT MADE, COULD NOT PROCEED');
                break;
            case 'CMUMM':
                // contact made, update monthly marker
                this.form.controls['note'].setValue('CONTACT WITH PATIENT MADE, UPDATE MONTHLY MARKER');
                break;
            case 'NORMAL':
                // contact made, update monthly marker
                this.form.controls['note'].setValue('ADD NOTE HERE');
                break;
        }
    }

    submit() {
        //console.log(this.data);
        //console.log(this.form.value);
        const dto: ContactResult = {
            patientId: this.data.patientId,
            type: this.data.type,
            note: this.form.value.note,
        };
        //console.log(dto);
        this.reordersService
            .processContact(dto)
            .toPromise()
            .then(() => {
                /* this._fuseConfirmationService.open({
                    title: 'Saved!',
                    message: 'Contact Note has been saved successfully.',
                    actions: {
                        confirm: {
                            label: 'OK'
                        },
                        cancel: {
                            show: false
                        }
                    },
                    icon: {
                        name: 'heroicons_outline:check-circle',
                        color: 'success'
                    },
                }); */
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(err => {
                console.log('error', err);
            })
            .finally(() => {
                //this.loading = false;
                this.dialogRef.close();
            });
    }
}
