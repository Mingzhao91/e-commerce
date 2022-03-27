import { Component, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';

import { OrdersService } from '@apps-workspace/orders';
import { ProductsService } from '@apps-workspace/products';
import { UsersService } from '@apps-workspace/users';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    statistics: number[] = [];

    constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ]).subscribe((values) => {
            this.statistics = values;
        });
    }
}
