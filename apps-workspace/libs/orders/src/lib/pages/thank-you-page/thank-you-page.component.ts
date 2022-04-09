import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-thank-you',
    templateUrl: './thank-you-page.component.html',
    styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent implements OnInit {
    constructor(private messageService: MessageService, private ordersService: OrdersService, private cartService: CartService) {}

    ngOnInit(): void {
        const orderData = this.ordersService.getCatchOrderData();
        this.ordersService
            .createOrder(orderData)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.cartService.setEmptyCart();
                    this.ordersService.removeCatchOrderData();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: `Fail to place your order. ${error.message}`
                    });
                }
            });
    }
}
