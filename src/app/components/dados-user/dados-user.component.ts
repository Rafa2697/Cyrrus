import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { AuthService } from '../../service/auth';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-dados-user',
  templateUrl: './dados-user.component.html',
  styleUrls: ['./dados-user.component.scss'],
  standalone: true,
  imports: [CommonModule, IonAvatar, IonButton, IonItem, IonLabel, IonText, IonIcon, IonCard, IonCardContent],
})
export class DadosUserComponent {
  protected authService = inject(AuthService);
}
