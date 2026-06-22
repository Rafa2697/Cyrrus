import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import  { CampanhasComponent } from '../../components/campanhas/campanhas.component';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.page.html',
  styleUrls: ['./home-users.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, CampanhasComponent]
})
export class HomeUsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
