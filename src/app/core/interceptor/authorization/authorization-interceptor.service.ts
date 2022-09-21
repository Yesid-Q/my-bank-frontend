import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { SessionStore } from '../../store/session';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private sessionStore: SessionStore,
    private toastService: ToastService,
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { autorization, accessToken } = this.sessionStore.value;

    let request = req;

    if(autorization) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(catchError((error) => this.#handlerAuthError(error)));
  }

  #handlerAuthError(err: HttpErrorResponse): Observable<any> {
    if(err.status === 401 || err.status === 403) {
      void this.toastService.onShowUnauthorized();
      void this.router.navigate(['login']);
      this.sessionStore.setLogout();
      return of(err.message);
    }
    return throwError(err);
  }

}
