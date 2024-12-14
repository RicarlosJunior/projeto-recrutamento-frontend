import { Component } from '@angular/core';
import { CandidaturasService } from '../../../services/candidaturas.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Candidatura } from '../../../models/candidatura';

@Component({
  selector: 'app-candidaturaslist',
  standalone: true,
  imports: [HttpClientModule],
  providers: [
    CandidaturasService
  ],
  templateUrl: './candidaturaslist.component.html',
  styleUrl: './candidaturaslist.component.scss'
})

export class CandidaturaslistComponent {

  candidaturas: Candidatura[] = [];

  constructor(private candidaturasService: CandidaturasService) {
    this.consultarCandidaturasPorUsuario();
  }

  consultarCandidaturasPorUsuario() {

    const usuarioId = Number(sessionStorage.getItem('id'));

    this.candidaturasService.consultarCandidaturasPorUsuario(usuarioId).subscribe({
      next: candidaturas => {
        this.candidaturas = candidaturas;
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
}

