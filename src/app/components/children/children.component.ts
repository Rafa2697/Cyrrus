import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Child } from '../../service/database';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-children-list',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ChildrenComponent implements OnInit {
  private database = inject(DatabaseService);
  private authService = inject(AuthService);

  children: Child[] = [];

  ngOnInit() {
    this.database.getChildren$().subscribe(data => {
      this.children = data;
    });
  }
}