import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Child {
  id: string;
  nome: string;
  idade: number;
  cpf: number;
  cpf_responsavel: number;
  email_user: string;
  cartao_saude: number;
  nome_responsavel: string;
  sexo: string;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private firestore = inject(Firestore);

  /** Busca em tempo real (atualiza quando a coleção muda) */
  getChildren$(): Observable<Child[]> {
    const ref = collection(this.firestore, 'children');
    return collectionData(ref, { idField: 'id' }) as Observable<Child[]>;
  }

  /** Busca única (uma vez) */
  async getChildrenOnce(): Promise<Child[]> {
    const ref = collection(this.firestore, 'children');
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Child[];
  }

  async addChild(child: Omit<Child, 'id'>): Promise<void> {
    const ref = collection(this.firestore, 'children');
    await addDoc(ref, child);
  }
}
