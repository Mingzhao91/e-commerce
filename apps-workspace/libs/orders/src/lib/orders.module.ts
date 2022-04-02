import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CartService } from './services/cart.service';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

export const routes: Route[] = [
    {
        path: 'cart',
        component: CartPageComponent
    }
];

const UX_MODULES = [BadgeModule, ButtonModule, InputNumberModule];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes), ...UX_MODULES],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
    exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
