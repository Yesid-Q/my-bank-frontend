import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStore } from 'src/app/core/store/auth';
import { IAuth, IAuthResponse } from 'src/app/shared/interface/auth.interface';

import { environment } from 'src/environments/environment';
import { IAccount } from '../../interface/account.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly #urlEndpoint = `${environment.url}profile`;

  constructor(
    private httpClient: HttpClient,
    private authStore: AuthStore
  ) {
  }
  public getMyInfo(): Observable<IAuthResponse> {
    return this.httpClient.get<IAuthResponse>(this.#urlEndpoint).pipe(map((response) => {
      this.authStore.setAuth({ ...response });
      return response;
    }));
  }

  public getMyAccounts(): Observable<Array<IAccount>> {
    return this.httpClient.get<Array<IAccount>>(`${this.#urlEndpoint}/accounts`);
  }


}
