import { Component, OnInit } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api';

import { CategoriesService, Category } from '@apps-workspace/products';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CategoriesListComponent implements OnInit {
    public categories: Category[] = [];

    constructor(private categoriesService: CategoriesService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this._getCategories();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategories(categoryId).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category is deleted!'
                        });
                        this._getCategories();
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category is not deleted!'
                        });
                    }
                });
            },
            reject: () => {}
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }
}
