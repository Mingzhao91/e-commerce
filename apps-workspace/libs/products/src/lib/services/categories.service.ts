import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
    }

    createCategories(category: Category): Observable<Category> {
        return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
    }

    updateCategories(category: Category): Observable<Category> {
        return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${category.id}`, category);
    }

    deleteCategories(categoryId: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`http://localhost:3000/api/v1/categories/${categoryId}`);
    }
}
