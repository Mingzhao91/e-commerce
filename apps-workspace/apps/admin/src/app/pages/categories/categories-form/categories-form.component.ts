import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { switchMap, filter, pluck, timer, Subject, takeUntil } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@apps-workspace/products';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public isSubmitted = false;
    public editMode = false;
    public currentCategoryId: string;
    public unsubscribe$: Subject<void> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            icon: ['', [Validators.required]],
            color: ['#fff']
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        if (this.editMode) {
            this._updateCategory({ ...this.form.value, id: this.currentCategoryId });
        } else {
            this._addCategory(this.form.value);
        }
    }

    private _updateCategory(category: Category) {
        this.categoriesService
            .updateCategories(category)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category ${category.name} is updated!`
                    });
                    timer(2000).subscribe(() => this.location.back());
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Category is not updated!'
                    });
                }
            });
    }

    private _addCategory(category: Category) {
        this.categoriesService
            .createCategories(category)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category ${category.name} is created!`
                    });
                    timer(2000).subscribe(() => this.location.back());
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Category is not created!'
                    });
                }
            });
    }

    private _checkEditMode() {
        this.route.params
            .pipe(
                pluck('id'),
                filter((id: string) => id != undefined),
                switchMap((id: string) => {
                    this.editMode = true;
                    this.currentCategoryId = id;
                    return this.categoriesService.getCategory(id);
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe((category) => {
                this.form.setValue({
                    name: category.name,
                    icon: category.icon,
                    color: category.color
                });
            });
    }

    onCancel() {
        this.location.back();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
