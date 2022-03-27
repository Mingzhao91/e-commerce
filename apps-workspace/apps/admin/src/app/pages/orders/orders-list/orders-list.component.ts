import { Component, OnInit } from '@angular/core';

import { Order, OrdersService } from '@apps-workspace/orders';

const ORDER_STATUS = {
    Pending: {
        label: 'Pending',
        color: 'primary'
    },
    Processed: {
        label: 'Processed',
        color: 'warning'
    },
    Shipped: {
        label: 'Shipped',
        color: 'warning'
    },
    Delivered: {
        label: 'Delivered',
        color: 'success'
    },
    Failed: {
        label: 'Failed',
        color: 'danger'
    }
};

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus: { [key: string]: { label: string; color: string } } = ORDER_STATUS;

    constructor(private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getOrders();
    }

    showOrder(orderId: string) {}

    deleteOrder(orderId: string) {}

    private _getOrders() {
        this.ordersService.getOrders().subscribe((orders) => {
            console.log(orders);
            this.orders = orders;
        });
    }
}
