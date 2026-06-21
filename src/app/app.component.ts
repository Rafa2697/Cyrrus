import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { DadosUserComponent } from './components/dados-user/dados-user.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
    RouterLink,
    DadosUserComponent,
  ],
})
export class AppComponent {
  constructor() {}
}
