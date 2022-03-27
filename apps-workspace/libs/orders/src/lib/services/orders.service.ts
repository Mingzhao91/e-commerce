import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from '../models/order';

import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = `${environment.apiURL}orders`;

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
    }

    createOrders(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order);
    }

    updateOrders(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${order.id}`, order);
    }

    deleteOrders(orderId: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiURLOrders}/${orderId}`);
    }
}
