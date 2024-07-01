import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/carrito.models';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.items);

  constructor() {}

  getCart() {
    return this.cartSubject.asObservable();
  }


  addToCart(producto: Producto, cantidad: number = 1) {
    const index = this.items.findIndex(item => item.producto.id === producto.id);
    if (index !== -1) {
      this.items[index].cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
    this.cartSubject.next(this.items);
  }

  removeFromCart(producto: Producto) {
    this.items = this.items.filter(item => item.producto.id !== producto.id);
    this.cartSubject.next(this.items);
  }



  clearCart() {
    this.items = [];
    this.cartSubject.next(this.items);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }
}
