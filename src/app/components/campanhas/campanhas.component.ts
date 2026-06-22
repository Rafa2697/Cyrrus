import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Campanha } from '../../service/database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CampanhasComponent implements OnInit {

  // Declara o Observable que vai receber as campanhas
  campanhas$!: Observable<Campanha[]>;

  constructor(private databaseService: DatabaseService) { }   // ← Injeção aqui

  ngOnInit() {
    this.campanhas$ = this.databaseService.getCampanhas$();
  }
}