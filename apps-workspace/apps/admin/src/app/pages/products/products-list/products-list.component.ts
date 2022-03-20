import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    products = [];

    constructor() {}

    ngOnInit(): void {}

    deleteProduct(productId: string) {}

    updateProduct(productId: string) {}
}
