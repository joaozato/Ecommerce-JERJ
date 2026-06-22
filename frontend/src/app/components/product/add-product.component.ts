import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CreateProduct } from '../../models/create-product.model';
import { ActivatedRoute } from '@angular/router';
import { SubmitButtonComponent } from '../../shared/SubmitButton/submit-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
//import { AuthService } from '../../services/auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [
    CommonModule,             // <-- necessário para utilizar *ngIf e *ngFor
    DecimalPipe,
    MenuComponent,
    FormsModule,
    RouterLink,
  ],
})



export class addProductComponent implements OnInit {

  product: CreateProduct = {
    nome: '',
    marca: '',
    categoria: '',
    preco: 0,
    custo:0,
    quantidade: 0,
    pathImagem: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Força o Angular a re-renderizar o template para evitar erros de req com a API
  ) {}

  ngOnInit(): void {}

  addProduct(): void {
    this.productService.add(this.product).subscribe({
      next: (savedProduct) => {
        console.log('Produto salvo:', savedProduct);

        this.product = {
          nome: '',
          marca: '',
          categoria: '',
          preco: 0,
          custo: 0,
          quantidade: 0,
          pathImagem: '',
        };

        this.router.navigate(['/admin/dashboard']);

      },
      error: (err) => {
        console.error('Erro ao salvar produto:', err);
      }
    });
  }





}
