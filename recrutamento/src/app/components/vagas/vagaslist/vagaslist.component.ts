
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vaga } from '../../../models/vaga';
import { VagasService } from '../../../services/vagas.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-vagaslist',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  providers: [
    VagasService,
    UtilsService
  ],
  templateUrl: './vagaslist.component.html',
  styleUrl: './vagaslist.component.scss'
})
export class VagaslistComponent {

  vagas: Vaga[] = [];
  usuarioRole: string | null = null;

  constructor(private vagasService: VagasService,
    private utilsService:UtilsService
  ) {
    this.listar();
    this.usuarioRole = sessionStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.usuarioRole === 'ADMIN';
  }

  listar() {
    this.vagasService.listar().subscribe({
      next: vagas => {
        this.vagas = vagas;
      },
      error: erro => {
        let mensagem = "Ocorreu um erro inesperado.";
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


  excluir(vaga: Vaga) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vagasService.excluir(vaga.id!).subscribe({
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

            let mensagem = "Ocorreu um erro inesperado.";
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
