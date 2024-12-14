import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Candidatura } from '../models/candidatura';

@Injectable({
  providedIn: 'root'
})
export class CandidaturasService {

  API = "http://localhost:8080/api/candidaturas";

  constructor(private http: HttpClient) { }

  candidatar(usuarioId: number, vagaId: number): Observable<string> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.post<string>(this.API + "/candidatar/" + vagaId, null, { params, responseType: 'text' as 'json' });
  }

  consultarCandidaturasPorUsuario(usuarioId:number): Observable<Candidatura[]> {
       return this.http.get<any[]>(this.API+"/consultar/"+usuarioId).pipe(
        map(candidaturasRecebidas =>
           candidaturasRecebidas.map(candidatura => ({
            id:candidatura.id,
            statusCandidatura: candidatura.statusCandidatura,
            vaga: candidatura.vaga,
          }))
          ,
          catchError((error) => {
            return throwError(() => new Error(error));
          })
        )
      );
    }

}
