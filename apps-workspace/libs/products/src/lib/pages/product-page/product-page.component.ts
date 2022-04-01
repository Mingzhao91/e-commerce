import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public quantity: number;

    constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

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

    addProductToCart() {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
