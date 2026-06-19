import { Component, OnInit, inject } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../service/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  protected authService = inject(AuthService);
  protected router = inject(Router);

  async entrar() {
    try{
      await this.authService.loginWithGoogle();
      this.router.navigate(['/home-users']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  constructor() { }

  ngOnInit() {}

}
