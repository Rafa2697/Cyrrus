import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import  { CampanhasComponent } from '../components/campanhas/campanhas.component';
import { addIcons } from 'ionicons';
import { cloudOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, RouterLink, CampanhasComponent],
})
export class HomePage {
  constructor() {
    addIcons({ cloudOutline, logInOutline });
  }
}
