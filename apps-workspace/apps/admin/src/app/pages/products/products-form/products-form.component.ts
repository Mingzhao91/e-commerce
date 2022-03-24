import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { timer } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CategoriesService, Category, Product, ProductsService } from '@apps-workspace/products';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
    public form: FormGroup;
    public isSubmitted = false;
    public editMode = false;
    public categories: Category[] = [];
    public imageDisplay: string | ArrayBuffer;
    public currentProductId: string;

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            brand: ['', [Validators.required]],
            price: ['', [Validators.required]],
            category: ['', [Validators.required]],
            countInStock: [0, [Validators.required]],
            description: ['', [Validators.required]],
            image: ['', Validators.required],
            richDescription: [''],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentProductId = params['id'];
                this.productsService.getProduct(params['id']).subscribe((product) => {
                    this.form.get('name')?.setValue(product.name);
                    this.form.get('category')?.setValue(product.category?.id);
                    this.form.get('brand')?.setValue(product.brand);
                    this.form.get('price')?.setValue(product.price);
                    this.form.get('countInStock')?.setValue(product.countInStock);
                    this.form.get('isFeatured')?.setValue(product.isFeatured);
                    this.form.get('description')?.setValue(product.description);
                    this.form.get('richDescription')?.setValue(product.richDescription);
                    this.form.get('image')?.setValidators([]);
                    this.form.get('image')?.updateValueAndValidity();
                    this.imageDisplay = product.image || '';
                });
            }
        });
    }

    onImageUpload(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result as string;
            };
            fileReader.readAsDataURL(file);
        }
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();
        Object.keys(this.form.controls).map((key) => {
            productFormData.append(key, this.form.value[key]);
        });

        if (this.editMode) {
            this._updateProduct(productFormData);
        } else {
            this._addProduct(productFormData);
        }
    }

    private _addProduct(productFormData: FormData) {
        this.productsService.createProduct(productFormData).subscribe({
            next: (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${product.name} is created!`
                });
                timer(2000).subscribe(() => this.location.back());
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not created!'
                });
            }
        });
    }

    private _updateProduct(productFormData: FormData) {
        this.productsService.updateProduct(productFormData, this.currentProductId).subscribe({
            next: (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${product.name} is updated!`
                });
                timer(2000).subscribe(() => this.location.back());
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not updated!'
                });
            }
        });
    }

    onCancel() {}
}
