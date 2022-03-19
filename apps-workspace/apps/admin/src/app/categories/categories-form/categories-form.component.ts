import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { timer } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CategoriesService } from '@apps-workspace/products';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss'],
    providers: [MessageService]
})
export class CategoriesFormComponent implements OnInit {
    public form: FormGroup = new FormBuilder().group({
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]]
    });
    public isSubmitted = false;

    constructor(private categoriesService: CategoriesService, private messageService: MessageService, private location: Location) {}

    ngOnInit(): void {}

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;
        this.categoriesService.createCategories(this.form.value).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category is created!'
                });
                timer(2000).subscribe(() => this.location.back());
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created!'
                });
            }
        });
    }
}
