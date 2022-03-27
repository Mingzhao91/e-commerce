import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { MessageService, ConfirmationService } from 'primeng/api';

import { Product, ProductsService } from '@apps-workspace/products';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService
                    .deleteProduct(productId)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe({
                        next: () => {
                            this._getProducts();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Product is deleted!'
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Product is not deleted!'
                            });
                        }
                    });
            }
        });
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
