import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../models/product';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@apps-workspace/orders';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {}

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
    }
}
