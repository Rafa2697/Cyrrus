import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
  updateDoc,
  Timestamp
} from '@angular/fire/firestore';
import { Observable, switchMap, from } from 'rxjs';
import { AuthService } from '../../app/service/auth';

// 1. Interface para tipar cada dose dentro da subcoleção da criança
export interface RegistroVacina {
  id?: string;
  id_vacina: string;
  nome_vacina: string;
  data_prevista: Timestamp; // Timestamp do Firebase
  status: boolean;
}

// 2. Interface da Criança corrigida de acordo com o seu banco de dados real
export interface Child {
  id?: string;
  nome: string;
  data_de_nascimento: any; // Alterado de idade para a data real do banco
  cpf: number;
  cpf_responsavel: number;  // Alterado para string conforme o print ("4619...")
  email_user: string;
  cartao_saude: number;
  nome_responsavel: string;
  sexo: string;
}

export interface Campanha {
  id?: string;
  titulo: string;
  descricao: string;
  inicio: Timestamp;
  fim: Timestamp;
  idade_alvo_min_meses: number;
  idade_alvo_max_meses: number;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  /** Busca as crianças do usuário logado em tempo real */
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

  /** NOVA FUNÇÃO: Busca em tempo real a subcoleção de vacinas de UMA criança específica */
  getVaccineRecords$(childId: string): Observable<RegistroVacina[]> {
    // Aponta direto para o caminho: children/ID_DA_CRIANCA/registro_vacinacao
    const subcolecaoRef = collection(this.firestore, `children/${childId}/registro_vacinacao`);
    return collectionData(subcolecaoRef, { idField: 'id' }) as Observable<RegistroVacina[]>;
  }

  updateVaccineStatus(childId: string, vaccineId: string, status: boolean): Promise<void> {
    const vaccineDocRef = doc(this.firestore, `children/${childId}/registro_vacinacao/${vaccineId}`);
    return updateDoc(vaccineDocRef, { status });
  }

  /**  Cria a criança E já gera o histórico de vacinas dela automaticamente */
  async addChild(child: Omit<Child, 'id'>): Promise<void> {
    // Converte data_de_nascimento para Timestamp se necessário
    let dataNascimentoTimestamp: Timestamp;
    
    if (child.data_de_nascimento instanceof Timestamp) {
      dataNascimentoTimestamp = child.data_de_nascimento;
    } else if (typeof child.data_de_nascimento === 'string') {
      // Vem como string do input date (YYYY-MM-DD)
      dataNascimentoTimestamp = Timestamp.fromDate(new Date(child.data_de_nascimento));
    } else if (child.data_de_nascimento instanceof Date) {
      dataNascimentoTimestamp = Timestamp.fromDate(child.data_de_nascimento);
    } else {
      throw new Error('Data de nascimento inválida');
    }

    // Prepara o objeto da criança com Timestamp
    const childToSave = {
      ...child,
      data_de_nascimento: dataNascimentoTimestamp
    };

    // 1. Salva a criança na coleção principal 'children'
    const childrenRef = collection(this.firestore, 'children');
    const novoFilhoDoc = await addDoc(childrenRef, childToSave);

    // 2. Busca todas as vacinas padrão do seu catálogo mestre ('vacinas')
    const vacinasMasterRef = collection(this.firestore, 'vacinas');
    const vacinasSnapshot = await getDocs(vacinasMasterRef);

    // 3. Cria um Batch (Lote) para salvar todas as vacinas de uma vez só de forma eficiente
    const batch = writeBatch(this.firestore);

    vacinasSnapshot.forEach((vacinaDoc) => {
      const dadosVacina = vacinaDoc.data();

      // Calcula a data prevista somando os meses recomendados à data de nascimento
      const dataNascimento = dataNascimentoTimestamp.toDate();
      const dataPrevista = new Date(dataNascimento);
      dataPrevista.setMonth(dataPrevista.getMonth() + (dadosVacina['idade_recommended_meses'] || 0));

      // Caminho da subcoleção onde a vacina vai ser inserida
      const subdocRef = doc(
        collection(this.firestore, `children/${novoFilhoDoc.id}/registro_vacinacao`)
      );

      // Prepara os dados da dose para o lote
      batch.set(subdocRef, {
        id_vacina: `/vacinas/${vacinaDoc.id}`,
        nome_vacina: dadosVacina['nome'] || 'Vacina Cadastrada',
        data_prevista: Timestamp.fromDate(dataPrevista),
        status: false // Começa como não tomada (pendente)
      });
    });

    // 4. Executa o lote inteiro no banco de dados
    await batch.commit();
  }


  //busca coleções de campanhas
  getCampanhas$(): Observable<Campanha[]> {
    const ref = collection(this.firestore, 'campanha');
    return collectionData(ref, { idField: 'id' }) as Observable<Campanha[]>;
  }
}