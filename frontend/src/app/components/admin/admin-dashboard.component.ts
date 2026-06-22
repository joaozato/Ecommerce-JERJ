import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../../services/admin/dashboard.service'
import { ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbItem, BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [
    DecimalPipe,
    RouterLink,
    HeaderComponent,
    BreadcrumbComponent,
  ],
})

export class AdminDashboardComponent implements OnInit
{

  cartItems = 0;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Dashboard' },
  ];

  revenue = 0;
  profit = 0;

  products: Product[] = [];


  constructor(
    private dashboardService: DashboardService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ){}


  ngOnInit(): void {

    this.dashboardService
      .connectDashboard()
      .subscribe({
        next: (data) => {

          //console.log(data)

          this.revenue =
            data.faturamentoTotal; // Faturamento que vem do SSE - Através do service dashboard

          this.profit =
            data.lucroLiquidoTotal; // Lucro que vem do SSE - Através do service dashboard

          this.cdr.detectChanges();
        },

        error: err => {
          console.error(err);
        }
      });


    this.listProducts();
  }



  listProducts(){

    this.productService
      .listAll()
      .subscribe({

        next: (products) => {

          this.products = products;

          this.cdr.detectChanges();

        },

        error: erro => {

          console.error(
            'Erro ao carregar produtos',
            erro
          );

        }

      });

  }



  deleteProduct(id:number){

    if(!confirm(
      'Deseja excluir este produto?'
    )) {
      return;
    }


    this.productService
      .delete(id)
      .subscribe({

        next:()=>{

          this.products =
            this.products.filter(
              p => p.id !== id
            );

          this.cdr.detectChanges();

        },

        error:err=>{
          console.error(err);
        }

      });


  }

}
