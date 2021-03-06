import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = `${environment.apiURL}users`;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
    }

    logout() {
        this.localStorageService.removeToken();
        this.router.navigate(['/login']);
    }
}
