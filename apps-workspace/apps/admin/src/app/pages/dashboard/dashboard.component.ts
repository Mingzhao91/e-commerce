import { Component, OnInit, OnDestroy } from '@angular/core';

import { combineLatest, Subject, takeUntil } from 'rxjs';

import { OrdersService } from '@apps-workspace/orders';
import { ProductsService } from '@apps-workspace/products';
import { UsersService } from '@apps-workspace/users';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public statistics: number[] = [];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ])
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
