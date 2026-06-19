import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injeta a instância do Auth que configuramos no main.ts
  private auth: Auth = inject(Auth);
  // Injeta o Router para navegação
  private router: Router = inject(Router);

  // Observable que emite o usuário autenticado ou null se não estiver logado
  user$: Observable<User | null> = user(this.auth);

  /**
   * Abre um pop-up para fazer login com o Google.
   * O provedor Google já está configurado no seu projeto Cyrrus!
   */

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
      throw error;
    }
  }

  /**
  * Encerra a sessão atual do usuário.
  */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Erro ao sair:', error);
      throw error;
    }
  }


}
