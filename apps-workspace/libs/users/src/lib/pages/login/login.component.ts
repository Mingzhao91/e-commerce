import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = '';

    constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private localStorageService: LocalStorageService) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.loginFormGroup.invalid) return;
        this.authService.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe({
            next: (user) => {
                this.authError = false;
                this.localStorageService.setToken(user.token);
                this.router.navigate(['/']);
            },
            error: (error: HttpErrorResponse) => {
                this.authError = true;

                if (error.status !== 400) {
                    this.authMessage = 'Error in the server, please try again later!';
                } else {
                    this.authMessage = 'Email or Password is incorrect';
                }
            }
        });
    }
}
