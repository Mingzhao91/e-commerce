import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';

import { Product } from '../../models/product';

import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public products: Product[];
    public categories: Category[];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this._getProducts();
        this._getCategories();
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
