import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit, OnDestroy {
    public cartCount = 0;
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cart$.pipe(takeUntil(this.unsubscribe$)).subscribe((cart) => {
            this.cartCount = cart?.items?.length ?? 0;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
