import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email!: string;
  senha!: string;

  constructor(private loginService: LoginService, private router: Router){}

  novoUsuario(){
    this.router.navigate(["usuarios/criar"]);
  }

  logar() {
    this.loginService.logar(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(["principal/vagas"]);
      },
      error: erro => {
        Swal.fire({
          title: 'Atenção',
          icon: 'error',
          text: erro.message,
          confirmButtonText: 'Ok',
        });
      }
    });
  }

}
