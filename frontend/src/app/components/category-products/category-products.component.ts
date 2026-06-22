import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { ProductCardComponent, ProductCardItem } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    HeaderComponent,
    MenuComponent,
    ProductCardComponent,
  ],
  providers: [TitleCasePipe],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent implements OnInit {
  categorySlug = 'celulares';
  categoryName = 'Celulares';
  cartItems = 0;
  breadcrumbItems: BreadcrumbItem[] = [];
  products: ProductCardItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private titleCasePipe: TitleCasePipe,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categorySlug = params.get('categoria') ?? 'celulares';
      this.categoryName = this.formatCategoryName(this.categorySlug);
      this.breadcrumbItems = [
        { label: 'HOME', route: '/home' },
        { label: this.categoryName },
      ];
      this.loadProductsByCategory();
    });
  }

  addToCart() {
    this.cartItems += 1;
  }

  private createMockProducts(categoryName: string): ProductCardItem[] {
    return Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      nome: `${categoryName} ${index + 1}`,
      marca: 'RJEJ',
      preco: 150.5,
      quantidade: 12,
      categoria: categoryName,
      avaliacoes: 33,
      valorParcela: 30.1,
      parcelas: 5,
    }));
  }

  private loadProductsByCategory() {
    this.productService.listByCategory(this.categoryName).subscribe({
      next: (products) => {
        this.products = products.length
          ? this.mapProducts(products)
          : this.createMockProducts(this.categoryName);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos por categoria:', err);
        this.products = this.createMockProducts(this.categoryName);
      },
    });
  }

  private mapProducts(products: Product[]): ProductCardItem[] {
    return products.map((product) => ({
      ...product,
      avaliacoes: 33,
      valorParcela: product.preco / 5,
      parcelas: 5,
    }));
  }

  private formatCategoryName(slug: string) {
    const normalized = slug.replace(/-/g, ' ');
    return this.titleCasePipe.transform(normalized) ?? 'Categoria';
  }
}
