import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth';


@Component({
  selector: 'app-dados-user',
  templateUrl: './dados-user.component.html',
  styleUrls: ['./dados-user.component.scss'],
  imports: [CommonModule],
})
export class DadosUserComponent  implements OnInit {

  protected authService = inject(AuthService);

  constructor() { }

  ngOnInit() {}

}
