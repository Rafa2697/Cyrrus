import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Child } from '../../service/database';

@Component({
  selector: 'app-children-list',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ChildrenComponent implements OnInit {
  private database = inject(DatabaseService);

  children: Child[] = [];

  ngOnInit() {
    this.database.getChildren$().subscribe(data => {
      this.children = data;
    });
  }
}