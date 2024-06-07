import { ValidatorFn } from "@angular/forms";

export const doesNotStartWithLetter: ValidatorFn = control => {
    const value = control.value as string;
    if (!value) return null;

    if (!/^[a-z]/.test(value)) return {doesNotStartWithLetter: true};
    return null;
}