import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Child, RegistroVacina } from '../../service/database'; // Importado daqui
import { Observable } from 'rxjs'; // Importante para o tipo reativo
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  IonList,
  IonBadge, IonNote, IonListHeader, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-children-list',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  standalone: true,
  imports: [IonIcon, IonListHeader, IonNote, 
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonLabel, IonButtons, IonButton, IonModal, IonList, IonBadge
  ],
})
export class ChildrenComponent implements OnInit {
  private database = inject(DatabaseService);

  @ViewChild('modal') modal!: IonModal;

  presentingElement!: HTMLElement | null;

  children: Child[] = [];
  selectedChild: Child | null = null;
  isModalOpen = false;
  
  // Nova propriedade que vai segurar o Observable de vacinas da criança aberta
  vacinas$: Observable<RegistroVacina[]> | null = null;

  ngOnInit() {
    this.database.getChildren$().subscribe(data => {
      this.children = data;
    });
    this.presentingElement = document.querySelector('.ion-page');
  }

  openChildDetails(child: Child) {
    this.selectedChild = child;
    this.isModalOpen = true;

    // A MÁGICA ACONTECE AQUI:
    // Se a criança possuir um ID válido, apontamos o Observable para a subcoleção dela
    if (child.id) {
      this.vacinas$ = this.database.getVaccineRecords$(child.id);
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedChild = null;
    this.vacinas$ = null; // Limpa as vacinas da memória ao fechar o modal
  }

  toggleVaccineStatus(vacina: RegistroVacina) {
    if (!this.selectedChild?.id || !vacina.id) {
      return;
    }

    const novoStatus = !vacina.status;
    this.database.updateVaccineStatus(this.selectedChild.id, vacina.id, novoStatus);
  }
}