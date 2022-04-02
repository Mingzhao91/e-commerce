import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, take, takeUntil } from 'rxjs';

import { CartItem, CartItemDetailed } from '../../models/cart';

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
    public cartCount = 0;

    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.unsubscribe$)).subscribe((cart) => {
            this.cartItemsDetailed = [];
            this.cartCount = cart?.items?.length ?? 0;

            cart.items.forEach((cartItem) => {
                console.log(cartItem);
                this.ordersService
                    .getProduct(cartItem.productId)
                    .pipe(take(1))
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

    deleteCartItem(cartItemDetailed: CartItemDetailed) {
        this.cartService.deleteCartItem(cartItemDetailed.product.id);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
