import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@apps-workspace/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-pdouct-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<void> = new Subject();
    public product: Product;
    public quantity = 1;

    constructor(private route: ActivatedRoute, private productsService: ProductsService, private cartService: CartService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this._getProduct(params['productid']);
            }
        });
    }

    private _getProduct(productid: string) {
        this.productsService
            .getProduct(productid)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((product: Product) => {
                this.product = product;
            });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id as string,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
