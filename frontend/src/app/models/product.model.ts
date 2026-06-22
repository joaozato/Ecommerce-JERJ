export interface Product {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  custo?: number;
  quantidade: number;
  categoria?: string;
  pathImagem?: string;
}

export interface CheckoutItem {
  id: number;
  quantidade: number;
}
