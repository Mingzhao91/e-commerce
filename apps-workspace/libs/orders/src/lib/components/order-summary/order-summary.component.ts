import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, take, takeUntil } from 'rxjs';

import { Cart, CartItem } from '../../models/cart';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    public totalPrice: number;
    public unsubscribe$: Subject<void> = new Subject();
    public isCheckout = false;

    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {
        this.isCheckout = this.router.url.includes('checkout');
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    private _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.unsubscribe$)).subscribe((cart: Cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items.map((item: CartItem) => {
                    this.ordersService
                        .getProduct(item.productId)
                        .pipe(take(1))
                        .subscribe((product) => {
                            this.totalPrice += product.price * item.quantity;
                        });
                });
            }
        });
    }

    navigateToCheckout() {
        this.router.navigate(['/checkout']);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
