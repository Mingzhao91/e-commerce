import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { switchMap, filter, pluck, takeUntil } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

import { Order, OrderItem, OrdersService } from '@apps-workspace/orders';

import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
    public order: Order;
    public orderStatuses: { id: string; name: string }[] = [];
    public selectedStatus: string;
    public unsubscribe$: Subject<void> = new Subject();

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
                switchMap((id) => this.ordersService.getOrder(id)),
                takeUntil(this.unsubscribe$)
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
            this.ordersService
                .updateOrder({ status: event.value }, this.order.id)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe({
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

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
