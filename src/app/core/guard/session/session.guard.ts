import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStore } from '../../store/session';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private sessionStore: SessionStore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { autorization } = this.sessionStore.value;

    if(!autorization) {
      return void this.router.navigate(['login']);
    }
    return true;
  }

}
