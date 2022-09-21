import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStore } from 'src/app/core/store/session';
import { ISessionResponse } from 'src/app/shared/interface/session.interface';

import { environment } from 'src/environments/environment';
import { ILogin, ILoginForm } from '../interface/login.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly #urlEndpoint = `${environment.url}auth/login`;

  constructor(
    private httpClient: HttpClient,
    private sessionStore: SessionStore
  ) { }

  /**
   * @method buildFormLogin
   * construye el formulario de inicio de session
   * @returns FormGroup
   */
  public buildFormLogin(): FormGroup<ILoginForm> {
    return new FormGroup<ILoginForm>({
      username: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  /**
   * @method onLoginUser
   * comunica con la api para iniciar session
   * @param form ILogin
   * @returns Observable
   */
  public onLoginUser(form: ILogin): Observable<ISessionResponse> {
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);

    return this.httpClient.post<ISessionResponse>(this.#urlEndpoint, formData, {
      //headers: new HttpHeaders().set('content-type', 'application/www-form-urlencoded')
    }).pipe(map((response) => {
      this.sessionStore.setLogin(response.accessToken, response.tokenType);
      return response;
    }));
  }

}
