import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const UX_MODULES = [CardModule, ToolbarModule, ButtonModule, TableModule];

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, ShellComponent, DashboardComponent, SidebarComponent, CategoriesListComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), ...UX_MODULES],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
