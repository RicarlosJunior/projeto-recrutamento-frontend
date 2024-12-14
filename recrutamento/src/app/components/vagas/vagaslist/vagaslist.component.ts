
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vaga } from '../../../models/vaga';
import { VagasService } from '../../../services/vagas.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vagaslist',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  providers: [
    VagasService
  ],
  templateUrl: './vagaslist.component.html',
  styleUrl: './vagaslist.component.scss'
})
export class VagaslistComponent {

  vagas: Vaga[] = [];
  usuarioRole: string | null = null;

  constructor(private vagasService: VagasService){
    this.listar();
    this.usuarioRole = sessionStorage.getItem('role');
  }

  isAdmin(): boolean {  
    return this.usuarioRole === 'ADMIN';
  }

  listar(){
    this.vagasService.listar().subscribe({
      next: vagas => {
        this.vagas = vagas;
      },
      error: erro => {
        Swal.fire({
          title: 'Atenção',
          icon: 'error',
          text: 'Ocorreu um erro inesperado.',
          confirmButtonText: 'Ok',
        });
      }
    });
  }


  excluir(vaga: Vaga){
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
          next: mensagem => {
            Swal.fire({
              title: 'Sucesso',
              icon: 'success',
              text: mensagem,
              confirmButtonText: 'Ok',
            });
            this.listar();
          },
          error: erro => {
            const errorMessage = erro.error || 'Ocorreu um erro inesperado.';
            Swal.fire({
              title: 'Atenção',
              icon: 'error',
              text: errorMessage,
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}
