import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';

import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    public featuredProducts: Product[];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getFeaturedProducts();
    }

    private _getFeaturedProducts() {
        this.productsService
            .getFeaturedProducts(4)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((featuredProducts: { products: Product[] }) => {
                this.featuredProducts = featuredProducts.products;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
