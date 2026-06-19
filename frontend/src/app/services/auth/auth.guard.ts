import { Injectable } from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import {inject} from '@angular/core';


// requiredRole: 'ADMIN' para admin, undefined para qualquer usuário logado - não vai precisar ficar colocando 'user' nas rotas
export const AuthGuard: (requiredRole?: 'ADMIN') => CanActivateFn = (requiredRole) => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Verifica se está logado
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    // Se a rota exige ADMIN
    if (requiredRole === 'ADMIN' && !authService.isAdmin()) {
      router.navigate(['/unauthorized']); // Página de acesso negado
      return false;
    }

    // Usuário logado e autorizado
    return true;
  };
};


