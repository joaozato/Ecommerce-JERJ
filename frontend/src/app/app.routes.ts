import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { VendaPageComponent } from './components/venda-page/venda-page.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard()]
  },
  {
    path: 'venda-page',
    component: VendaPageComponent,
  },
  {
    path: 'venda',
    component: VendaPageComponent,
  },
  {
    path: 'categoria/:categoria',
    component: CategoryProductsComponent,
  },
  {
    path: 'categorias/:categoria',
    component: CategoryProductsComponent,
  },
  {
    path: 'meu-perfil',
    component: ProfileComponent,
  },
  {
    path: 'minhas-compras',
    component: ProfileComponent,
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard('ADMIN')],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];
