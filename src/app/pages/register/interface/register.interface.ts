import { AbstractControl } from '@angular/forms';

export interface IRegisterForm {
  docNumber: AbstractControl<string>;
  name: AbstractControl<string>;
  lastname: AbstractControl<string>;
  email: AbstractControl<string>;
  phone: AbstractControl<string>;
  password: AbstractControl<string>;
  verifyPassword: AbstractControl<string>;
  documentId: AbstractControl<string>;
}

export interface IRegister {
  docNumber: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  verifyPassword: string;
  documentId: string;
}
