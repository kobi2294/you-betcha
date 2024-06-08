import { ValidatorFn } from "@angular/forms";

export type ListItemValidator = (value: string) => boolean;

export type ListItemValidatorMap = {
    'none': ListItemValidator,
    'email': ListItemValidator,
    'numeric': ListItemValidator,     
}

export const ListItemValidators: ListItemValidatorMap = {
    none: (_: string) => true,
    email: (value: string) => value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i) !== null,
    numeric: (value: string) => !Number.isNaN(Number.parseFloat(value)), 
}

export type ListItemValidatorType = keyof ListItemValidatorMap;


export function validatorAdapter(validator: ListItemValidator): ValidatorFn {
    return (control) => {
        return validator(String(control.value)) ? null : { invalid: true };
    }
}