import { Injectable } from '@angular/core';

import { Store } from '..';
import { ISession } from 'src/app/shared/interface/session.interface';
import { AppConstants } from 'src/app/app.constants';


@Injectable({
    providedIn: 'root'
})
export class SessionStore extends Store<ISession> {

    constructor() {
        super({
            accessToken: '',
            tokenType: '',
            autorization: false
        });

        if(localStorage.getItem(AppConstants.localStorageKeys.token) && localStorage.getItem(AppConstants.localStorageKeys.tokenType)) {
            this.setLogin(
                localStorage.getItem(AppConstants.localStorageKeys.token),
                localStorage.getItem(AppConstants.localStorageKeys.tokenType)
            );
        }
    }

    /**
     * @method setLogin
     * guarda el estado de la seccion
     * @param accessToken string
     * @param tokenType string
     */
    public setLogin(accessToken: string, tokenType: string): void {
        localStorage.setItem(AppConstants.localStorageKeys.token, accessToken);
        localStorage.setItem(AppConstants.localStorageKeys.tokenType, tokenType);

        this.dispatch({
            autorization: true,
            accessToken,
            tokenType,
        });
    }

    /**
     * @method setLogout
     * elimina el estado de la seccion
     */
    public setLogout(): void {
        localStorage.removeItem(AppConstants.localStorageKeys.token);
        localStorage.removeItem(AppConstants.localStorageKeys.tokenType);

        this.dispatch({
            accessToken: '',
            tokenType: '',
            autorization: false
        });
    }

    public refreshToken(token: string): void {
        this.dispatch({ ...this.value, accessToken: token });
    }

}
