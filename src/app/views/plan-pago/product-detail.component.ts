import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,IonTitle, IonButtons, IonToolbar, IonBackButton, IonHeader, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Producto } from 'src/app/common/models/producto.model';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonCol, IonRow, IonGrid, IonHeader, IonBackButton, IonToolbar, IonButtons,IonButton, IonTitle, CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class ProductDetailComponent  implements OnInit {
  planPagoDocs$: Observable<any[]>;
  userId: string;

   productId: string;
  producto: Producto | undefined;

  constructor(
    private firestoreService: FirestoreService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }


async loadProduct() {
    if (this.productId) {
      this.producto = await this.firestoreService.getProductoById(this.productId);
    }
  }

  comprar() {
    const message = `Hola, estoy interesado en el producto ${this.producto.nombre}`;
    const whatsappUrl = `https://wa.me/5491167554362?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }


  loadPlanPago() {
    const path = `Usuarios/${this.userId}/planPago`;
    this.planPagoDocs$ = this.firestoreService.getCollectionChanges(path);
  }

  getSanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
