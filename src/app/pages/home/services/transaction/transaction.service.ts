import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransaction } from '../../interface/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly #urlEndpoint = `${environment.url}transaction`;

  constructor(private httpClient: HttpClient) { }

  onSendTransaction(id: string, data): void {
    this.httpClient.put(`${this.#urlEndpoint}/${id}`, data).subscribe(console.log);
  }

  onGetTransaction(): Observable<Array<ITransaction>> {
    return this.httpClient.get<Array<ITransaction>>(this.#urlEndpoint);
  }

}
