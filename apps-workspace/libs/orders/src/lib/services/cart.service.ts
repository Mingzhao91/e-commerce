import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor() {}

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initCart = { items: [] };
            const initCartJson = JSON.stringify(initCart);
            localStorage.setItem(CART_KEY, initCartJson);
            this.cart$.next(initCart);
        } else {
            this.cart$.next(cart);
        }
    }

    getCart(): Cart {
        const cartJsonString: string = localStorage.getItem(CART_KEY);
        const cart: Cart = JSON.parse(cartJsonString);
        return cart;
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();
        const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
        if (cartItemExist) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity + cartItem.quantity;
                }
            });
        } else {
            cart.items.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }
}
