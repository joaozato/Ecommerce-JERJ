import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { SubmitButtonComponent } from '../../shared/SubmitButton/submit-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LucideStar } from '@lucide/angular';
import { InstallmentOption } from '../../models/installment.model'
//import { AuthService } from '../../services/auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [
    CommonModule,             // <-- necessário para utilizar *ngIf e *ngFor
    DecimalPipe,
    LucideStar,
  ],
})



export class ProductDetailsComponent implements OnInit {


  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Força o Angular a re-renderizar o template para evitar erros de req com a API
  ) {}



  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id') // Coleta o id do produto para enviar na url
    );


    this.productService
      .searchById(id)
      .subscribe(product => {
        this.product = product;
        // console.log(product)
        this.generateInstallments(product.preco);
        this.cdr.detectChanges(); // Re-render - Coloquei para evitar qualquer erro de renderizar sem os dados da API
      });

  }

  installmentOptions: InstallmentOption[] = [];

  generateInstallments(price: number) {
    const max = 10; // Máximo de parcelas

    this.installmentOptions = [];

    for (let i = 1; i <= max; i++) {
      this.installmentOptions.push({
        installments: i,
        value: price / i
      });
    }

  }
}
