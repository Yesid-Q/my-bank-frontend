import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRegister, IRegisterForm } from '../interface/register.interface';
import { environment } from 'src/environments/environment';
import { SessionStore } from 'src/app/core/store/session';
import { ISessionResponse } from 'src/app/shared/interface/session.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  readonly #urlEndpoint = `${environment.url}auth/register`;

  constructor(
    private httpClient: HttpClient,
    private sessionStore: SessionStore
  ) { }

  /**
   * @method buildFormRegister
   * construye el formulario de registro de un usuario.
   * @returns FormGroup
   */
  public buildFormRegister(): FormGroup<IRegisterForm> {
    return  new FormGroup<IRegisterForm>({
        docNumber: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^\d+$/)
        ]),
        name: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
        lastname: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
        email: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.email
        ]),
        phone: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        password: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24)
        ]),
        verifyPassword: new FormControl<string>(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24)
        ]),
        documentId: new FormControl<string>(undefined, [
          Validators.required
        ])
      });
  }

  /**
   * @method onRegisterUser
   * Comunica con la api para guardar el usuario
   * @param form IRegister
   * @returns Observable
   */
  public onRegisterUser(form: IRegister): Observable<ISessionResponse> {
    return this.httpClient.post<ISessionResponse>(this.#urlEndpoint, form).pipe(map(( response) => {
      this.sessionStore.setLogin(response.accessToken, response.tokenType);
      return response;
    }));
  }

}
