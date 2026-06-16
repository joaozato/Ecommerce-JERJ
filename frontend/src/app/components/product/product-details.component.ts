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

//import { AuthService } from '../../services/auth/auth.service';

export interface InstallmentOption {
  installments: number;
  value: number;
}

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [
    CommonModule,             // <-- necessário para utilizar *ngIf e *ngFor
    DecimalPipe,

  ]
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
      this.route.snapshot.paramMap.get('id')
    );



    this.productService
      .searchById(id)
      .subscribe(product => {
        this.product = product;
        console.log(product)
        this.generateInstallments(product.preco);
        this.cdr.detectChanges();
      });

  }

  installmentOptions: InstallmentOption[] = [];

  generateInstallments(price: number) {
    const max = 10;

    this.installmentOptions = [];

    for (let i = 1; i <= max; i++) {
      this.installmentOptions.push({
        installments: i,
        value: price / i
      });
    }

    console.log('INSTALLMENTS:', this.installmentOptions);
  }
}
