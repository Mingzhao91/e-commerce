import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem() {}
}
