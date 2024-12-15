
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-usuarioslist',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  providers: [
    UsuariosService,
    UtilsService
  ],
  templateUrl: './usuarioslist.component.html',
  styleUrl: './usuarioslist.component.scss'
})
export class UsuarioslistComponent {

  usuarios: Usuario[] = [];
  usuarioRole: string | null = null;
  usuario:Usuario | null = null;

  constructor(private usuariosService: UsuariosService,
              private utilsService:UtilsService,
              private routerNavegacao: Router){
       
     this.usuarioRole = sessionStorage.getItem('role');           

    if(this.isAdmin()){
      this.listar();
    }else{
      this.consultarUsuarioLogado();
    }            
  }

  isAdmin(): boolean {  
    return this.usuarioRole === 'ADMIN';
  }

  listar(){
    this.usuariosService.listar().subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
      },
      error: erro => {
        let mensagem = "Não foi possível realizar essa operação.";
        if (erro.status) {
          mensagem = this.utilsService.mensagemErroStatus(erro.status);
        }
        Swal.fire({
          title: 'Atenção',
          icon: 'error',
          text: mensagem,
          confirmButtonText: 'Ok',
        });
      }
    });
  }

   consultarUsuarioLogado() {
      const usuarioLogadoId = Number(sessionStorage.getItem('id'));
      this.routerNavegacao.navigate(['principal/usuarios/alterar', usuarioLogadoId]);
  }

  excluir(usuario: Usuario){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.excluir(usuario.id!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Sucesso',
              icon: 'success',
              text: 'Operação realizada com sucesso.',
              confirmButtonText: 'Ok',
            });
            this.listar();
          },   
          error: erro => {
            let mensagem = "Não foi possível realizar essa operação.";
            if (erro.status) {
              mensagem = this.utilsService.mensagemErroStatus(erro.status);
            }
            Swal.fire({
              title: 'Atenção',
              icon: 'error',
              text: mensagem,
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}
