import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    public isCategoryPage: boolean;
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private route: ActivatedRoute, private productsService: ProductsService, private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.isCategoryPage = params['categoryid'] ? true : false;
            params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
        });
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.productsService
            .getProducts(categoriesFilter)
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

    categoryFilter() {
        const selectedCategoris = this.categories.filter((category) => category.checked).map((category) => category.id);
        this._getProducts(selectedCategoris as string[]);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
