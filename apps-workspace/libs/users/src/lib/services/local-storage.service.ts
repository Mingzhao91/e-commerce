import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}

    setToken(data: any) {
        localStorage.setItem(TOKEN, data);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }

    isValidToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            return !this._isTokenExpired(tokenDecode.exp);
        } else {
            return false;
        }
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));

            return tokenDecode ? tokenDecode.userId : null;
        } else {
            return null;
        }
    }

    private _isTokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
