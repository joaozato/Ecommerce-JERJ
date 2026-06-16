import { Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProductDetailsComponent } from './components/product/product-details.component';
import {AuthGuard} from './services/auth/auth.guard';


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
    //canActivate: [AuthGuard()] // AuthGuard sem parâmetro -> Rota pode ser acessada por usuário LOGADO com privilégio USER
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuard('ADMIN')] // AuthGuard sem parâmetro -> Rota pode ser acessada por usuário LOGADO com privilégio USER
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    //canActivate: [AuthGuard()] // AuthGuard sem parâmetro -> Rota pode ser acessada por usuário LOGADO com privilégio USER
  }

];
