import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone'
import { ChildrenComponent } from '../../components/children/children.component';
import { CadastroChildrenComponent } from '../../components/cadastro-children/cadastro-children.component';

@Component({
  selector: 'app-children',
  templateUrl: './children.page.html',
  styleUrls: ['./children.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    ChildrenComponent,
    CadastroChildrenComponent,
  ],
})
export class ChildrenPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
