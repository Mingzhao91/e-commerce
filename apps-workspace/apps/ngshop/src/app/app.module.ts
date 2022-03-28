import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { UiModule } from '@apps-workspace/ui';
import { ProductsModule } from '@apps-workspace/products';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductLstComponent } from './pages/product-lst/product-lst.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductLstComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, UiModule, ProductsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
