import { AbstractControl } from '@angular/forms';
import { ITypeAccount } from 'src/app/shared/interface/type-account.interface';

export interface IAccount {
  id: string;
  alias: string;
  bank: string;
  numberAccount: number;
  amount: number;
  typeAccount: ITypeAccount;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IAccountForm {
  alias: AbstractControl<string>;
  bank: AbstractControl<string>;
  amount: AbstractControl<number>;
  numberAccount: AbstractControl<string>;
  typeAccountId: AbstractControl<string>;
}

export interface IAccountValue {
  alias: string;
  bank: string;
  numberAccount: string;
  typeAccountId: string;
}

export interface IAccountInfo {
  alias: string;
  bank: string;
  numberAccount: number;
}
