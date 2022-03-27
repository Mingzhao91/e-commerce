import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { MessageService, ConfirmationService } from 'primeng/api';

import { Order, OrdersService } from '@apps-workspace/orders';

import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
    public orders: Order[] = [];
    public orderStatus = ORDER_STATUS;
    public unsubscribe$: Subject<void> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService
                    .deleteOrder(orderId)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe({
                        next: () => {
                            this._getOrders();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Order is deleted!'
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Order is not deleted!'
                            });
                        }
                    });
            }
        });
    }
    private _getOrders() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((orders) => {
                this.orders = orders;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
