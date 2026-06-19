import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth';
import { map, take } from 'rxjs';

// Permite acesso apenas para usuários LOGADOS 
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Garante que o stream seja finalizado após ler o estado atual
    map(user => {
      if (user) {
        return true; // Acesso liberado
      } else {
        // Redireciona para o login de forma limpa usando UrlTree
        return router.createUrlTree(['/auth']);
      }
    })
  );
};

// Impede que usuários JÁ LOGADOS acessem páginas públicas (ex: tela de Login)
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true; // Se não estiver logado, pode acessar a tela de login
      } else {
        // Se já estiver logado, manda direto para o painel
        return router.createUrlTree(['/home-users']);
      }
    })
  );
};
