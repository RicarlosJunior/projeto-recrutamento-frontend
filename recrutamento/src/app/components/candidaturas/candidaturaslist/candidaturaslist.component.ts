import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CandidaturasService } from '../../../services/candidaturas.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Candidatura } from '../../../models/candidatura';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidaturaslist',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, MdbModalModule, HttpClientModule],
  providers: [
    CandidaturasService,
    UtilsService
  ],
  templateUrl: './candidaturaslist.component.html',
  styleUrl: './candidaturaslist.component.scss'
})

export class CandidaturaslistComponent {


  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalDevolutiva") modalDevolutiva!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  candidatura: Candidatura | null = null;
  candidaturas: Candidatura[] = [];
  usuarioRole: string | null = null;
  devolutiva: string | null = null;

  constructor(private candidaturasService: CandidaturasService,
    private utilsService: UtilsService) {

    this.usuarioRole = sessionStorage.getItem('role');
    if (this.isAdmin()) {
      this.listar();
    } else {
      this.consultarCandidaturasPorUsuario();
    }


  }

  isAdmin(): boolean {
    return this.usuarioRole === 'ADMIN';
  }

  consultarCandidaturasPorUsuario() {

    const usuarioId = Number(sessionStorage.getItem('id'));

    this.candidaturasService.consultarCandidaturasPorUsuario(usuarioId).subscribe({
      next: candidaturas => {
        this.candidaturas = candidaturas;
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


  listar() {
    this.candidaturasService.listar().subscribe({
      next: candidaturas => {
        this.candidaturas = candidaturas;
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


  aprovar(candidatura: Candidatura) {
    Swal.fire({
      title: 'Tem certeza que deseja aprovar essa candidatura?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.candidaturasService.aprovar(candidatura.id!, candidatura).subscribe({
          next: () => {
            Swal.fire({
              title: "Sucesso",
              icon: 'success',
              text: "Candidatura aprovada!",
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


  reprovar() {
    this.candidaturasService.reprovar(this.candidatura!.id!, this.candidatura!).subscribe({
      next: () => {
        Swal.fire({
          title: "Candidatura reprovada!",
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        this.listar();
        this.fecharModal();
      },
      error: erro => {
        this.fecharModal();
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


  abrirModalReprovacao(candidatura: Candidatura) {
    Swal.fire({
      title: 'Tem certeza que deseja reprovar essa candidatura?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.abrirModal(candidatura);
      }
    });
  }


  abrirModal(candidatura: Candidatura) {
    this.candidatura = candidatura;
    this.modalRef = this.modalService.open(this.modalDevolutiva);
  }
  fecharModal() {
    this.modalRef.close();
  }

}

