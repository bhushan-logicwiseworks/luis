import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export function get(object, path) {
    const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
    const pathArrayFlat = pathArray.flatMap(part => (typeof part === 'string' ? part.split('.') : part));

    return pathArrayFlat.reduce((obj, key) => obj && obj[key], object);
}

export interface ValidatorRule {
    validator: ValidatorFn;
    message: string;
}

export interface AsyncValidatorRule extends ValidatorRule {
    validator: AsyncValidatorFn;
    async: true;
}

export interface ValidatorDefinition {
    [errorKey: string]: ValidatorRule | AsyncValidatorRule;
}

export type ValidatorPath<T> =
    | keyof T
    | [keyof T, keyof T[keyof T]]
    | [keyof T, keyof T[keyof T], keyof T[keyof T][keyof T[keyof T]]]; // Only 3 level deep objects supported for now

export type ValidatorDefinitionOrValidatorGroup<T> =
    T extends Array<infer E> ? ValidatorGroup<E> : T extends object ? ValidatorGroup<T> : ValidatorDefinition;

export type ValidatorGroup<T, Key extends keyof T = keyof T> = {
    [P in Key]: ValidatorDefinitionOrValidatorGroup<T[Key]>;
};

export type ObjectOrArray<T> = T extends Array<infer E> ? E : T extends object ? T : never;

export class Validator<T, Key extends keyof T = keyof T> {
    defaultMessage = 'This field is invalid.';

    constructor(private validators: ValidatorGroup<T>) {}

    get<K extends keyof T>(key: K): Validator<ObjectOrArray<T[K]>> {
        return new Validator<ObjectOrArray<T[K]>>(this.validators[key] as any);
    }

    getError(form: AbstractControl, path: ValidatorPath<T>): string[] | null {
        const control = form.get(path as string | string[]);

        if (control && control.invalid) {
            return Object.keys(control.errors || {}).map(
                error =>
                    (this.getValidator(path) &&
                        this.getValidator(path)[error] &&
                        this.getValidator(path)[error].message) ||
                    this.defaultMessage
            );
        }

        return null;
    }

    getValidatorFn(path: ValidatorPath<T>) {
        const validators = this.getValidator(path);
        return Object.keys(validators || {})
            .filter(
                key =>
                    validators[key] &&
                    !(validators[key] as unknown as AsyncValidatorRule).async &&
                    validators[key].validator
            )
            .map(key => validators[key].validator as ValidatorFn);
    }

    getAsyncValidatorFn(path: ValidatorPath<T>) {
        const validators = this.getValidator(path);
        return Object.keys(validators || {})
            .filter(
                key =>
                    validators[key] &&
                    (validators[key] as unknown as AsyncValidatorRule).async &&
                    validators[key].validator
            )
            .map(key => validators[key].validator as AsyncValidatorFn);
    }

    isRequired(path: ValidatorPath<T>) {
        return this.getValidator(path) && !!this.getValidator(path)['required'];
    }

    getValidator(path: ValidatorPath<T>): ValidatorDefinition {
        return get(this.validators, path);
    }
}
