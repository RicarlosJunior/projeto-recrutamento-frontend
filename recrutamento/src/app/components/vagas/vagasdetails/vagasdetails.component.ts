
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
import { UtilsService } from '../../../services/utils.service';



@Component({
  selector: 'app-vagasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink, MdbModalModule, HttpClientModule],
  providers: [
    VagasService,
    CandidaturasService,
    UtilsService
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
  carregando:boolean = false;


  constructor(private router: ActivatedRoute,
    private vagasService: VagasService,
    private routerNavegacao: Router,
    private candidaturasService: CandidaturasService,
    private utilsService: UtilsService) {

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

  candidatar() {

    const usuarioId = Number(sessionStorage.getItem('id'));

    this.carregando = true;

    this.candidaturasService.candidatar(usuarioId, this.vaga.id!).subscribe({
      next: mensagem => {
        Swal.fire({
          title: 'Sucesso',
          icon: 'success',
          text: mensagem,
          confirmButtonText: 'Ok',
        });
        this.carregando = false;
        this.routerNavegacao.navigate(['principal/vagas']);
      },
      error: erro => {
        this.carregando = false;
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
      },
    });
  }

  criar() {
    if (this.validarCamposVaga()) {

      this.vaga.responsavelId = Number(sessionStorage.getItem('id'));

      this.vagasService.criar(this.vaga).subscribe({
        next: () => {
          Swal.fire({
            title: "Sucesso",
            icon: 'success',
            text: 'Operação realizada com sucesso!',
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['principal/vagas'], { state: { vagaNova: this.vaga } });
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

  alterar() {
    if (this.vaga.id! > 0 && this.validarCamposVaga()) {
      this.vagasService.alterar(this.vaga.id!, this.vaga).subscribe({
        next: () => {
          Swal.fire({
            title: "Sucesso",
            icon: 'success',
            text: "Vaga alterada com sucesso!",
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['principal/vagas'], { state: { vagaEditada: this.vaga } });
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

  validarCamposVaga(): boolean {
    let mensagem = "";

    if (!this.vaga.titulo) {
      mensagem += 'Campo título da vaga inválido!<br><br>';
    }
    if (!this.vaga.descricao) {
      mensagem += 'Campo descrição da vaga inválido!<br><br>';
    }
    if (this.vaga.requisitos.length === 0) {
      mensagem += 'Para gerar/alterar uma vaga é necessario informar ao menos um requisito!<br><br>';
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
