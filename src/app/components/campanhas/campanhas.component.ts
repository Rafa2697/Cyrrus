import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Campanha } from '../../service/database';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonText, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonText, IonSpinner]
})
export class CampanhasComponent implements OnInit {

  // Declara o Observable que vai receber as campanhas
  campanhas$!: Observable<Campanha[]>;

  constructor(private databaseService: DatabaseService) { 
    addIcons({ calendarOutline });
  }

  ngOnInit() {
    this.campanhas$ = this.databaseService.getCampanhas$();
  }
}