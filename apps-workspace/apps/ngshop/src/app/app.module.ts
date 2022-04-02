import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { UiModule } from '@apps-workspace/ui';
import { ProductsModule } from '@apps-workspace/products';
import { OrdersModule } from '@apps-workspace/orders';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const UX_MODULES = [ToastModule];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, UiModule, ProductsModule, OrdersModule, ...UX_MODULES],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
