import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { IAuth } from 'src/app/shared/interface/auth.interface';
import { Store } from '..';

@Injectable({
    providedIn: 'root'
})
export class AuthStore extends Store<IAuth> {

    constructor() {
        super({
            id: '',
            docNumber: '',
            name: '',
            lastname: '',
            email: '',
            phone: ''
        });

        if(localStorage.getItem(AppConstants.localStorageKeys.auth)) {
            this.setAuth(JSON.parse(localStorage.getItem(AppConstants.localStorageKeys.auth)));
        }
    }

    public setAuth(auth: IAuth): void {
        localStorage.setItem(AppConstants.localStorageKeys.auth, JSON.stringify(auth));
        this.dispatch(auth);
    }

    public deleteAuth(): void {
        localStorage.removeItem(AppConstants.localStorageKeys.auth);
        this.dispatch({
            id: '',
            docNumber: '',
            name: '',
            lastname: '',
            email: '',
            phone: ''
        });
    }

}
