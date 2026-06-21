import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar],
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
