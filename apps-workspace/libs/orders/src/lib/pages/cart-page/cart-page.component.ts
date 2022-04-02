import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { CartItemDetailed } from '../../models/cart';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<void> = new Subject();
    public cartItemsDetailed: CartItemDetailed[] = [];

    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.unsubscribe$)).subscribe((cart) => {
            cart.items.forEach((cartItem) => {
                console.log(cartItem);
                this.ordersService
                    .getProduct(cartItem.productId)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe((product) => {
                        console.log('product: ', product);
                        this.cartItemsDetailed.push({
                            product,
                            quantity: cartItem.quantity
                        });
                    });
            });
        });
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem() {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
