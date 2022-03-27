import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap, filter, pluck } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

import { Order, OrderItem, OrdersService } from '@apps-workspace/orders';

import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    orderStatuses: { id: string; name: string }[] = [];
    selectedStatus: string;

    constructor(private location: Location, private route: ActivatedRoute, private ordersService: OrdersService, private messageService: MessageService) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
    }

    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label
            };
        });
    }

    private _getOrder() {
        this.route.params
            .pipe(
                pluck('id'),
                filter((id) => id != undefined),
                switchMap((id) => this.ordersService.getOrder(id))
            )
            .subscribe((order) => {
                this.order = order;
                this.selectedStatus = this.order?.status || '';
            });
    }

    getOrderItemSubtotal(orderItem: OrderItem) {
        let subtotal = null;

        if (orderItem && orderItem.product && !isNaN(orderItem.product.price as number) && !isNaN(orderItem.quantity as number)) {
            subtotal = (orderItem.product.price as number) * (orderItem.quantity as number);
        }

        return subtotal;
    }

    onStatusChange(event: any) {
        if (this.order?.id) {
            this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Order is updated!'
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Order is not updated!'
                    });
                }
            });
        }
    }

    onBack() {
        this.location.back();
    }
}
