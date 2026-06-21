import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-dados-user',
  templateUrl: './dados-user.component.html',
  styleUrls: ['./dados-user.component.scss'],
  standalone: true,
  imports: [CommonModule, IonAvatar, IonButton, IonItem, IonLabel, IonText],
})
export class DadosUserComponent {
  protected authService = inject(AuthService);
}
