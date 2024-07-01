import { Component, OnInit } from '@angular/core';
import { CartService } from '../../common/services/cart.service';
import { CartItem } from '../../common/models/carrito.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Producto } from 'src/app/common/models/producto.model';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
 standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})


export class CarritoComponent  implements OnInit {
   cartItems: CartItem[] = [];
  total: number = 0;


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }



//   buy() {
//   const mensaje = this.cartItems.map(item =>
//     `${item.producto.nombre} x${item.cantidad}`
//   ).join('%0A');

//   const totalMensaje = `%0A%0ATotal: ${this.total}`;
//   const whatsappNumber = '5491167554362';
//   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}${totalMensaje}`;

//   window.open(whatsappUrl, '_blank');
// }

buy() {
    // Mensaje inicial del WhatsApp
    let mensaje = 'Hola, quiero comprar:';

    // Lista de productos del carrito
    this.cartItems.forEach(item => {
      mensaje += `%0A- ${item.producto.nombre} x ${item.cantidad}`;
    });

    // Total del carrito
    const totalMensaje = `%0A%0ATotal: $${this.total.toFixed(2)}`;

    // Número de WhatsApp al que enviar el mensaje
    const whatsappNumber = '5491167554362'; // Reemplaza con tu número de WhatsApp

    // URL completa para abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}${totalMensaje}`;

    // Abrir en una nueva pestaña o ventana del navegador
    window.open(whatsappUrl, '_blank');
  }


   removeFromCart(producto: Producto) {
    this.cartService.removeFromCart(producto);
    this.total = this.cartService.getTotal();
  }

}
