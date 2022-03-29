import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Category } from '../../models/category';

import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    public categories: Category[] = [];
    public unsubscribe$: Subject<void> = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
