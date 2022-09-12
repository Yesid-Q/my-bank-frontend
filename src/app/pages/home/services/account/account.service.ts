import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAccount, IAccountForm, IAccountValue } from '../../interface/account.interface';
import { map } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly #urlEndpoint = `${environment.url}account`;

  readonly #field = 'FIELDS.ACCOUNT';

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService,
    private toastService: ToastService
  ) { }

  /**
   * @method buildFormAccount
   * construye el formulario de account
   * @returns FormGroup
   */
  public buildFormAccount(): FormGroup<IAccountForm> {
    return new FormGroup<IAccountForm>({
      alias: new FormControl<string>(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      bank: new FormControl<string>(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      numberAccount: new FormControl<string>(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11),
        Validators.pattern(/^\d+$/)
      ]),
      typeAccountId: new FormControl<string>(null, [
        Validators.required
      ])
    });
  }

  public onGetByAccount(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.#urlEndpoint}/${id}`);
  }

  public onCreateAccount(form: IAccountValue): Observable<IAccount> {
    return this.httpClient.post<IAccount>(this.#urlEndpoint, form).pipe(map((response) => {
      void this.toastService.onShowCreate(this.#field);
      return response;
    }));
  }

  public onUpdateAccount(id: string, form: IAccountValue): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${this.#urlEndpoint}/${id}`, form).pipe(map((response) => {
      void this.toastService.onShowUpdate(this.#field);
      return response;
    }));
  }

}
