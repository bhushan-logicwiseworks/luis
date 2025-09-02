import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
interface FileValidation {
    status: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuxUtilService {
    defaultAllowedTypes = ['image/jpeg', 'image/png'];

    constructor(private router: Router) {}

    transFormValues(data, fieldTypes) {
        for (let index = 0; index < fieldTypes.length; index++) {
            switch (fieldTypes[index].type) {
                case 'boolean':
                    fieldTypes[index].fields.forEach(element => {
                        data[element] = data[element] ? 'Y' : 'N';
                    });
                    break;
                case 'date':
                    fieldTypes[index].fields.forEach(element => {
                        data[element] = data[element] ? data[element] : new Date(1900, 0, 1);
                    });
                    break;
                case 'number':
                    fieldTypes[index].fields.forEach(element => {
                        data[element] = typeof data[element] !== 'undefined' ? Number(data[element]) : data[element];
                    });
                    break;
                case 'string':
                    fieldTypes[index].fields.forEach(element => {
                        data[element] = data[element] ? data[element].toString() : '';
                    });
                    break;
            }
        }
        return data;
    }

    transFormValuesToUpperCase(data, fields: string[]) {
        fields.forEach(element => {
            try {
                data[element] =
                    typeof data[element] !== 'undefined' && data[element] !== null
                        ? data[element].toString().toUpperCase()
                        : '';
            } catch (error) {}
        });
        return data;
    }

    cleanData(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === null) {
                obj[key] = '';
            }
        });
        return obj;
    }

    convertObjToUppercase(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].toUpperCase();
            }
        }
        return obj;
    }

    fileVaildation(fileObj: File, allowedTypes: string[] = this.defaultAllowedTypes) {
        const fileSizeInMB: number = fileObj.size / (1024 * 1024); // Convert file size to MB
        let validationObj: FileValidation = {
            status: true,
            message: '',
        };
        //check file type
        if (!allowedTypes.includes(fileObj.type)) {
            validationObj = {
                status: false,
                message: 'Please upload ' + allowedTypes.map(allowedType => allowedType.split('/')[1]) + ' type',
            };
        }
        //check file size (limit to 10MB)
        if (fileSizeInMB >= 10) {
            validationObj = {
                status: false,
                message: 'File size exceeds the limit of 10MB',
            };
        }
        return validationObj;
    }

    formatDateFields(data, dateFields) {
        for (let index = 0; index < dateFields.length; index++) {
            if (data.hasOwnProperty(dateFields[index])) {
                data = {
                    ...data,
                    [dateFields[index]]: this.formatDate(data[dateFields[index]]),
                };
            }
        }
        return data;
    }

    formatDate(dateToFormat: string) {
        const localDate = new Date(dateToFormat);
        const month = localDate.getMonth() + 1;
        const monthPrefix = month < 10 ? '0' : '';
        const year = localDate.getFullYear();
        const date = localDate.getDate();
        const datePrefix = date < 10 ? '0' : '';
        return `${year}-${monthPrefix}${month}-${datePrefix}${date}`;
    }

    manuallyCheckDateValid(date, formGroup: FormGroup, formControlName) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime()) && date !== '') {
            formGroup.get(formControlName).setErrors({ notValidDate: true });
        }
        return formGroup;
    }

    objFilled(obj) {
        const values = Object.values(obj);
        return values.some(
            value =>
                value !== null &&
                value !== undefined &&
                value !== '' &&
                !(typeof value === 'string' && value.trim() === '')
        );
    }

    transformWorkOrderDates(workrep, keysToTransform: string[]): any {
        keysToTransform.forEach(key => {
            if (workrep[key] === '1900-01-01T00:00:00') {
                workrep[key] = '';
            }
        });
        return workrep;
    }

    transformBankStringToDefaultDate(workrep, keysToTransform: string[]): any {
        keysToTransform.forEach(key => {
            if (workrep[key] === '') {
                workrep[key] = '1900-01-01T00:00:00';
            }
        });
        return workrep;
    }

    makeCall(phoneNumber: string): void {
        if (phoneNumber && phoneNumber.length >= 10) {
            const formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
            const telLink = `tel:${formattedNumber}`;
            window.location.href = telLink; // Initiates the call
        }
    }

    redirectToNewTab(field: string, params: any) {
        let url: string;

        // Switch-case for different fields (you can add more cases as needed)
        switch (field) {
            case 'patientid':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid])
                );
                break;
            case 'id':
                url = this.router.serializeUrl(this.router.createUrlTree(['centers/patient-center', params.data.id]));
                break;
            case 'trackingnumber':
                url = this.router.serializeUrl(this.router.createUrlTree(['track', params.data.trackingnumber]));
                break;
            case 'compliance':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'compliance'])
                );
                break;
            case 'caremanagement':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'caremanagement'])
                );
                break;
            case 'audit':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'audit-event'])
                );
                break;
            case 'primary':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'primary'])
                );
                break;
            case 'secondary':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'secondary'])
                );
                break;
            case 'returns':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'returns'])
                );
                break;
            case 'patientrefunds':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'patientrefunds'])
                );
                break;
            case 'insurancerefunds':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'insurancerefunds'])
                );
                break;
            case 'insurancepaid':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'insurancepaid'])
                );
                break;
            case 'patientcalls':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'patientcalls'])
                );
                break;
            case 'claimcalls':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'claimcalls'])
                );
                break;

            case 'appeals':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'appeals'])
                );
                break;
            case 'openarreport':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'openarreport'])
                );
                break;
            case 'financialassistance':
                url = this.router.serializeUrl(
                    this.router.createUrlTree(['centers/patient-center', params.data.patientid, 'financialassistance'])
                );
                break;
            default:
                return;
        }

        // Open the URL in a new tab
        window.open(url, '_blank');
    }

    futureDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const inputDate = new Date(control.value);
            inputDate.setHours(0, 0, 0, 0);

            return inputDate < currentDate ? { pastDate: true } : null;
        };
    }

    pastDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            const inputDate = new Date(control.value);
            inputDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate ? { futureDateNotAllowed: true } : null;
        };
    }
}
