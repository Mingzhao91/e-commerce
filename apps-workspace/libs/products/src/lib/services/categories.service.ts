import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../models/category';

import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = `${environment.apiURL}categories`;

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}${categoryId}`);
    }

    createCategories(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category);
    }

    updateCategories(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiURLCategories}${category.id}`, category);
    }

    deleteCategories(categoryId: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiURLCategories}${categoryId}`);
    }
}
