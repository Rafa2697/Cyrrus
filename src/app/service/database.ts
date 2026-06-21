import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../app/service/auth';

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
  vacinas?: string;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  

  /** Busca em tempo real (atualiza quando a coleção muda) */
  getChildren$(): Observable<Child[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.email) {
          return new Observable<Child[]>(subscriber => subscriber.next([]));
        }

        const ref = query(
          collection(this.firestore, 'children'),
          where('email_user', '==', user.email)
        );

        return collectionData(ref, { idField: 'id' }) as Observable<Child[]>;
      })
    );
  }


  async addChild(child: Omit<Child, 'id'>): Promise<void> {
    const ref = collection(this.firestore, 'children');
    await addDoc(ref, child);
  }
}
