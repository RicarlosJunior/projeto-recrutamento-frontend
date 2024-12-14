
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { Vaga } from '../../../models/vaga';
import { VagasService } from '../../../services/vagas.service';
import { CandidaturasService } from '../../../services/candidaturas.service';



@Component({
  selector: 'app-vagasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink, MdbModalModule, HttpClientModule],
  providers: [
    VagasService,
    CandidaturasService
  ],
  templateUrl: './vagasdetails.component.html',
  styleUrl: './vagasdetails.component.scss'
})
export class VagasdetailsComponent {

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalRequisito") modalRequisito!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  requisito!: string;
  vaga: Vaga = new Vaga();
  usuarioRole: string | null = null;

  constructor(private router: ActivatedRoute, 
              private vagasService: VagasService, 
              private routerNavegacao: Router,
              private candidaturasService: CandidaturasService) {

    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.consultar(id);
    }
    this.usuarioRole = sessionStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.usuarioRole === 'ADMIN';
  }

  abrirModal() {
    this.resetarRequisito();
    this.modalRef = this.modalService.open(this.modalRequisito);
  }

  fecharModal() {
    this.modalRef.close();
  }

  resetarRequisito() {
    this.requisito = "";
  }

  adicionarRequisito() {
    const requisitoJaAdicionado = this.vaga.requisitos.some(r => r === this.requisito);
    if (requisitoJaAdicionado) {
      Swal.fire({
        title: 'Atenção!',
        icon: 'error',
        text: 'Requisito já adicionado!',
        confirmButtonText: 'Ok',
      });
    } else if (this.requisito === "") {
      Swal.fire({
        title: 'Atenção',
        icon: 'error',
        text: 'Requisito inválido!',
        confirmButtonText: 'Ok',
      });
    } else {
      this.vaga.requisitos.push(this.requisito);
    }
    this.fecharModal();
  }

  excluirRequisisto(requisito: string) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vaga.requisitos = this.vaga.requisitos.filter(r => r !== requisito);
      }
    });
  }

  consultar(id: number) {
    this.vagasService.consultar(id).subscribe({
      next: vagaConsultada => {
        this.vaga = vagaConsultada;
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

  candidatar(){

    const usuarioId = Number(sessionStorage.getItem('id'));

    this.candidaturasService.candidatar(usuarioId, this.vaga.id!).subscribe({
      next: mensagem => {
        Swal.fire({
          title: 'Sucesso',
          icon: 'success',
          text: mensagem,
          confirmButtonText: 'Ok',
        });
        this.routerNavegacao.navigate(['principal/vagas']);
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

  criar() {
 
    this.vaga.responsavelId = Number(sessionStorage.getItem('id'));

    this.vagasService.criar(this.vaga).subscribe({
      next: vaga => {
        Swal.fire({
          title: "Sucesso",
          icon: 'success',
          text: 'Operação realizada com sucesso!',
          confirmButtonText: 'Ok',
        });
        this.routerNavegacao.navigate(['principal/vagas'], { state: { vagaNova: this.vaga } });
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

  alterar() {
    this.vagasService.alterar(this.vaga.id!, this.vaga).subscribe({
      next: vaga => {
        Swal.fire({
          title: "Sucesso",
          icon: 'success',
          text: "Vaga alterada com sucesso!",
          confirmButtonText: 'Ok',
        });
        this.routerNavegacao.navigate(['admin/vendas'], { state: { vagaEditada: this.vaga } });
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
}
