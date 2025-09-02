import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Validator, ValidatorGroup, ValidatorPath } from './validator';

/**
 * ValidatorService
 * v1.0.0
 */
@Injectable({
    providedIn: 'root',
})
export class ValidatorService {
    common = {
        required: () => ({
            required: {
                validator: Validators.required,
                message: 'This field is required',
            },
        }),
        email: () => ({
            email: {
                validator: Validators.email,
                message: 'This is not a valid email',
            },
        }),
        minLength: minLength => ({
            minlength: {
                validator: Validators.minLength(minLength),
                message: `Minimum length is ${minLength} characters`,
            },
        }),
        maxLength: maxLength => ({
            maxlength: {
                validator: Validators.maxLength(maxLength),
                message: `Maximum length is ${maxLength} characters`,
            },
        }),
        min: min => ({
            min: {
                validator: Validators.min(min),
                message: `Minimum value allowed is ${min}`,
            },
        }),
        pattern: (pattern: Parameters<typeof Validators.pattern>[0], message: string) => ({
            pattern: {
                validator: Validators.pattern(pattern),
                message,
            },
        }),
        time: () => ({
            time: {
                validator: (control: AbstractControl) =>
                    Validators.pattern(new RegExp('^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$'))(control)
                        ? { time: true }
                        : null,
                message: 'Invalid time format, please use HH:MM e.g. 18:45',
            },
        }),
        timeWithSeconds: () => ({
            time: {
                validator: (control: AbstractControl) =>
                    Validators.pattern(new RegExp('^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]:[0-5][0-9]$'))(control)
                        ? { time: true }
                        : null,
                message: 'Invalid time format, please use HH:MM:SS e.g. 18:45:32',
            },
        }),
        requiredTrue: () => ({
            requiredTrue: {
                validator: Validators.requiredTrue,
                message: 'This field is required',
            },
        }),
        isObjectWithId: () => ({
            isObjectWithId: {
                validator: control => {
                    if (!control.value) {
                        return null;
                    }

                    if (!control.value._id) {
                        return { isObjectWithId: true };
                    }
                },
                message: 'Select an option from the dropdown',
            },
        }),
        isPhoneNumber: () => ({
            isPhoneNumber: {
                validator: (control: AbstractControl) =>
                    Validators.pattern('^\\+[1-9]{1}[0-9]{3,14}$')(control) ? { isPhoneNumber: true } : null,
                message: 'This is not valid, please use this format: +61123456789',
            },
        }),
    };

    constructor(private fb: UntypedFormBuilder) {}

    createValidator<T extends object>(validators: ValidatorGroup<T>): Validator<T> {
        return new Validator(validators);
    }

    createFormGroup<T extends object = any>(
        validator: Validator<T>,
        definition: Partial<Record<keyof T, AbstractControl | any | null>>,
        form?: UntypedFormGroup,
        previousKeys: string[] = []
    ): UntypedFormGroup {
        if (!form) {
            form = this.fb.group(definition);
        }

        Object.keys(form.controls).forEach(key => {
            const path = previousKeys.length > 0 ? [...previousKeys, key] : key;

            if (form.get(key) instanceof UntypedFormControl) {
                form.get(key).setValidators(validator.getValidatorFn(path as ValidatorPath<T>));
                form.get(key).setAsyncValidators(validator.getAsyncValidatorFn(path as ValidatorPath<T>));
            }

            if (form.get(key) instanceof UntypedFormGroup) {
                this.createFormGroup(validator, definition, form.get(key) as UntypedFormGroup, [...previousKeys, key]);
            }

            if (form.get(key) instanceof UntypedFormArray) {
                const formArray = form.get(key) as UntypedFormArray;
                formArray.controls.forEach(control =>
                    control.setValidators(validator.getValidatorFn(path as ValidatorPath<T>))
                );
                formArray.controls.forEach(control =>
                    control.setAsyncValidators(validator.getAsyncValidatorFn(path as ValidatorPath<T>))
                );
            }
        });

        return form;
    }
}
