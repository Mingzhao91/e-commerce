import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { CartService } from '@apps-workspace/orders';

import { MessageService } from 'primeng/api';

@Component({
    selector: 'ngshop-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private messageService: MessageService, private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cart$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Cart Updated!'
            });
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
