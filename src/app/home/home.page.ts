import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import  { CampanhasComponent } from '../components/campanhas/campanhas.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, CampanhasComponent],
})
export class HomePage {
  constructor() {}
}
