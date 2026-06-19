import { Component, OnInit, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {LoginComponent} from "../../components/login/login.component"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoginComponent]
})
export class AuthPage implements OnInit {
 // Injeta o serviço de forma simples e limpa
  protected authService = inject(AuthService);
  constructor() { }

  ngOnInit() {
  }

}
