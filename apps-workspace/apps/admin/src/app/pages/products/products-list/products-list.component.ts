import { Component, OnInit } from '@angular/core';

import { Product, ProductsService } from '@apps-workspace/products';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getProducts();
    }

    deleteProduct(productId: string) {}

    updateProduct(productId: string) {}

    private _getProducts() {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
