import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOne =
    (validator: ValidatorFn) =>
    (group: UntypedFormGroup): ValidationErrors | null => {
        const hasAtLeastOne =
            group && group.controls && Object.keys(group.controls).some(k => !validator(group.controls[k]));

        return hasAtLeastOne ? null : { atLeastOne: true };
    };
