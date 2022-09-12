import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppConstants } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { ITypeAccount } from '../../interface/type-account.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeAccountService {

  readonly #urlEndpoint = `${environment.url}type_account`;

  constructor(private httpClient: HttpClient) { }

  public getAllTypeAccount(): Observable<Array<ITypeAccount>> {
    if(localStorage.getItem(AppConstants.localStorageKeys.typeAccount)) {
      return of(JSON.parse(localStorage.getItem(AppConstants.localStorageKeys.typeAccount))).pipe(take(1));
    }

    return this.httpClient.get<Array<ITypeAccount>>(this.#urlEndpoint).pipe(map((res) => {
      localStorage.setItem(AppConstants.localStorageKeys.typeAccount, JSON.stringify(res));
      return res;
    }));
  }

}
