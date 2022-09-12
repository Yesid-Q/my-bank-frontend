import { AbstractControl } from '@angular/forms';

export interface ILoginForm {
    username: AbstractControl<string>;
    password: AbstractControl<string>;
}

export interface ILogin {
    username: string;
    password: string;
}
