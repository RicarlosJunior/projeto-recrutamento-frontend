import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule, CommonModule, HttpClientModule],
  providers: [
    LoginService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  usuarioRole: string | null = null;
  nomeUsuarioLogado: string | null = null;

  constructor(private loginService: LoginService){
    this.usuarioRole = sessionStorage.getItem('role');
    this.nomeUsuarioLogado = sessionStorage.getItem('nome');
  }

  sair() {
    this.loginService.sair();
  }

  isAdmin(): boolean {  
    return this.usuarioRole === 'ADMIN';
  }

}
