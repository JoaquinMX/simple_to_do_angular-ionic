import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export class MyValidators {

    static validPassword(control: AbstractControl) {
        const value = control.value;
        if (!containsNumber(value)) {
            return {invalid_password: true};
        }
        return null;
    }

    static matchingPassword(thePassword: AbstractControl, theConfirm: AbstractControl) {
        const password = thePassword.value;
        const confirm = theConfirm.value;
        if (password !== confirm) {
            return {invalid_password: true};
        }
        return null;
    }

    static validateLogin(service: AuthService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return service.login(value.name, value.password)
            .pipe(
                map(response => {
                    if (response.token) {
                        return null;
                    }
                    return {not_logged: true};
                })
            );
        }
    }
}

function containsNumber(value: string) {
    return value.split('').find(v=> isNumber(v) !== undefined);
}

function isNumber(value: string) {
    return !isNaN(parseInt(value, 10));
}