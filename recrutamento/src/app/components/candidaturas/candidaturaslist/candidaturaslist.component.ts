import { Component } from '@angular/core';
import { CandidaturasService } from '../../../services/candidaturas.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Candidatura } from '../../../models/candidatura';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-candidaturaslist',
  standalone: true,
  imports: [HttpClientModule],
  providers: [
    CandidaturasService,
    UtilsService
  ],
  templateUrl: './candidaturaslist.component.html',
  styleUrl: './candidaturaslist.component.scss'
})

export class CandidaturaslistComponent {

  candidaturas: Candidatura[] = [];

  constructor(private candidaturasService: CandidaturasService, 
              private utilsService: UtilsService) {
    this.consultarCandidaturasPorUsuario();
  }

  consultarCandidaturasPorUsuario() {

    const usuarioId = Number(sessionStorage.getItem('id'));

    this.candidaturasService.consultarCandidaturasPorUsuario(usuarioId).subscribe({
      next: candidaturas => {
        this.candidaturas = candidaturas;
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
}

