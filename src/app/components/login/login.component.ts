import { Component, OnInit, inject } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../service/auth';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon]
})
export class LoginComponent  implements OnInit {

  protected authService = inject(AuthService);
  protected router = inject(Router);

  constructor() { 
    addIcons({ logoGoogle });
  }

  async entrar() {
    try{
      await this.authService.loginWithGoogle();
      this.router.navigate(['/home-users']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }


  ngOnInit() {}

}
