import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductLstComponent } from './pages/product-lst/product-lst.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@apps-workspace/ui';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductLstComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, AppRoutingModule, UiModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
