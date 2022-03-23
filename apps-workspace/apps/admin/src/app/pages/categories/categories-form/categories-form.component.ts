import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { timer } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@apps-workspace/products';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
    public form: FormGroup;
    public isSubmitted = false;
    public editMode = false;
    public currentCategoryId: string;

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            icon: ['', [Validators.required]],
            color: ['#fff']
        });

        this._checkEditMode();
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
        this.categoriesService.updateCategories(category).subscribe({
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
        this.categoriesService.createCategories(category).subscribe({
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
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe((category) => {
                    this.form.setValue({
                        name: category.name,
                        icon: category.icon,
                        color: category.color
                    });
                });
            }
        });
    }
}
