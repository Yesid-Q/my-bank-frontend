import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppConstants } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { IDocument } from '../../interface/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly #urlEndpoint = `${environment.url}document`;

  constructor(private httpClient: HttpClient) { }

  public getAllDocuments(): Observable<Array<IDocument>> {
    if(localStorage.getItem(AppConstants.localStorageKeys.documents)) {
      return of(JSON.parse(localStorage.getItem(AppConstants.localStorageKeys.documents))).pipe(take(1));
    }
    return this.httpClient.get<Array<IDocument>>(this.#urlEndpoint).pipe(map((res) => {
      localStorage.setItem(AppConstants.localStorageKeys.documents, JSON.stringify(res));
      return res;
    }));
  }

}
