import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService); // Permite utilizar as funções de AuthService que está no arquivo services/auth/auth.service.ts

  const token = authService.getToken(); // Utiliza a função que está no services/auth/auth.service.ts para coletar o token JWT

  if (token) {

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Adiciona o token jwt nas futuras requisições
      }
    });

    return next(clonedRequest);
  }

  return next(req);
};
