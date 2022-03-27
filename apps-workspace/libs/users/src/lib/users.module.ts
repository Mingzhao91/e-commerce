import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export const usersRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    }
];

const UX_MODULES = [InputTextModule, ButtonModule];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(usersRoutes), FormsModule, ReactiveFormsModule, ...UX_MODULES],
    declarations: [LoginComponent]
})
export class UsersModule {}
