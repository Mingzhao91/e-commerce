import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoriesService, Category } from '@apps-workspace/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    public categories: Category[] = [];
    private componentDestroyed$ = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
