import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import  { CampanhasComponent } from '../components/campanhas/campanhas.component';
import { addIcons } from 'ionicons';
import { cloudOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, RouterLink, CampanhasComponent],
})
export class HomePage {
  constructor() {
    addIcons({ cloudOutline, logInOutline });
  }
}
