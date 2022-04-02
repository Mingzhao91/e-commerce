import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { CartService } from './services/cart.service';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

export const routes: Route[] = [
    {
        path: 'cart',
        component: CartPageComponent
    }
];

const UX_MODULES = [BadgeModule, ButtonModule, InputNumberModule];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ...UX_MODULES],
    declarations: [CartIconComponent, CartPageComponent],
    exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
