import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Product } from '../models/product';

import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = `${environment.apiURL}products`;

    constructor(private http: HttpClient) {}

    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
        }

        return this.http.get<Product[]>(this.apiURLProducts, { params });
    }

    createProduct(productFormData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productFormData);
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
    }

    updateProduct(productFormData: FormData, productId: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productFormData);
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
    }

    getProductsCount(): Observable<number> {
        return this.http.get<number>(`${this.apiURLProducts}/get/count`).pipe(map((objectValue: any) => objectValue.productCount));
    }

    getFeaturedProducts(count: number): Observable<{ products: Product[] }> {
        return this.http.get<{ products: Product[] }>(`${this.apiURLProducts}/get/featured/${count}`);
    }
}
