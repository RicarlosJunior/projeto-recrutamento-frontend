import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MdbModalModule} from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuariosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink, MdbModalModule, HttpClientModule],
  providers: [
    UtilsService,
    UsuariosService
  ],
  templateUrl: './usuariosdetails.component.html',
  styleUrl: './usuariosdetails.component.scss'
})
export class UsuariosdetailsComponent {

    usuario: Usuario = new Usuario();
    usuarioRole: string | null = null;
    usuarioLogadoId = Number(sessionStorage.getItem('id'));

    constructor(private router: ActivatedRoute,
        private usuariosService: UsuariosService,
        private routerNavegacao: Router,
        private utilsService: UtilsService){

      let id = this.router.snapshot.params['id'];
      if (id > 0) {
        this.consultar(id);
      }
      this.usuarioRole = sessionStorage.getItem('role');
    }

    isAdmin(): boolean {
      return this.usuarioRole === 'ADMIN';
    }

    consultar(id: number) {
        this.usuariosService.consultar(id).subscribe({
          next: usuarioConsultado => {
            this.usuario = usuarioConsultado;
          },
          error: erro => {
            let mensagem = "Não foi possível realizar essa operação.";
            if (erro.status ) {
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


       criar() {
          if (this.validarCamposUsuario()) {
      
            this.usuariosService.criar(this.usuario).subscribe({
              next: () => {
                Swal.fire({
                  title: "Sucesso",
                  icon: 'success',
                  text: 'Operação realizada com sucesso!',
                  confirmButtonText: 'Ok',
                });
                this.routerNavegacao.navigate(['principal/usuarios'], { state: { usuarioNova: this.usuario } });
              },
              error: erro => {     
                console.log("erro custom "+erro)
                let mensagem = "Não foi possível realizar essa operação.";
                if (erro.status) {
                  mensagem = this.utilsService.mensagemErroStatus(erro.status, erro.message);
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
        }
      
        alterar() {
          if (this.usuario.id! > 0 && this.validarCamposUsuario()) {
            this.usuariosService.alterar(this.usuario.id!, this.usuario).subscribe({
              next: () => {
                Swal.fire({
                  title: "Sucesso",
                  icon: 'success',
                  text: "Usuário alterado com sucesso!",
                  confirmButtonText: 'Ok',
                });
                this.routerNavegacao.navigate(['principal/usuarios'], { state: { usuarioEditada: this.usuario } });
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
        }

        validarCamposUsuario(): boolean {
            let mensagem = "";
        
            if (!this.usuario.nome) {
              mensagem += 'Campo nome inválido!<br><br>';
            }
            if (!this.usuario.email) {
              mensagem += 'Campo email inválido!<br><br>';
            }

            if (mensagem) {
              Swal.fire({
                title: 'Erros de Validação',
                html: `<div style="text-align: center;">${mensagem}</div>`,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
              return false;
            }
            return true;
          }

}
