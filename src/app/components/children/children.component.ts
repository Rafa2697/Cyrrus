import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Child } from '../../service/database';
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
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-children-list',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButtons, IonButton, IonModal],
})
export class ChildrenComponent implements OnInit {
  private database = inject(DatabaseService);

  @ViewChild('modal') modal!: IonModal;

  presentingElement!: HTMLElement | null;

  children: Child[] = [];
  selectedChild: Child | null = null;
  isModalOpen = false;

  ngOnInit() {
    this.database.getChildren$().subscribe(data => {
      this.children = data;
    });
    this.presentingElement = document.querySelector('.ion-page');
  }

  openChildDetails(child: Child) {
    this.selectedChild = child;
    this.isModalOpen = true;
  }
}