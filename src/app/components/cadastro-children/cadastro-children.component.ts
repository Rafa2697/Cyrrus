import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonNote,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import { Child, DatabaseService } from '../../service/database';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-cadastro-children',
  templateUrl: './cadastro-children.component.html',
  styleUrls: ['./cadastro-children.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption
  ],
})

export class CadastroChildrenComponent {
  private database = inject(DatabaseService);
  private authService = inject(AuthService)

  isModalOpen = false;
  saving = false;

  child: Omit<Child, 'id'> = this.createEmptyChild();

  constructor() {
    addIcons({ add, close });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.child = this.createEmptyChild();
  }

  async save(): Promise<void> {
    if (!this.child.nome.trim()) {
      return;
    }

    this.saving = true;

    try {
      const currentUser = await firstValueFrom(this.authService.user$);
      this.child.email_user = currentUser?.email || '';
      await this.database.addChild(this.child);
      this.closeModal();
    } catch (error) {
      console.error('Erro ao cadastrar criança:', error);
    } finally {
      this.saving = false;
    }
  }

  private createEmptyChild(): Omit<Child, 'id'> {
    return {
      nome: '',
      data_de_nascimento: null,
      cpf: 0,
      cpf_responsavel: 0,
      email_user: '',
      cartao_saude: 0,
      nome_responsavel: '',
      sexo: '',
    };
  }
}
