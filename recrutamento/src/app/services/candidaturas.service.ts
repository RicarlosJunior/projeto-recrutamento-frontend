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
            usuario: candidatura.usuario,
            devolutiva: candidatura.devolutiva,
          }))
          ,
          catchError((error) => {
            return throwError(() => new Error(error));
          })
        )
      );
    }

    listar(): Observable<Candidatura[]> {
      return this.http.get<any[]>(this.API).pipe(
       map(candidaturasRecebidas =>
          candidaturasRecebidas.map(candidatura => ({
           id:candidatura.id,
           statusCandidatura: candidatura.statusCandidatura,
           vaga: candidatura.vaga,
           usuario: candidatura.usuario,
           devolutiva: candidatura.devolutiva,
         }))
         ,
         catchError((error) => {
           return throwError(() => new Error(error));
         })
       )
     );
   }

   aprovar(id: number, candidatura: Candidatura): Observable<Candidatura> {
    return this.http.put<any>(this.API + "/aprovar/" + id, candidatura).pipe(
      map(candidatura => ({
        id:candidatura.id,
        statusCandidatura: candidatura.statusCandidatura,
        vaga: candidatura.vaga,
        usuario: candidatura.usuario,
        devolutiva: candidatura.devolutiva,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  reprovar(id: number, candidatura: Candidatura): Observable<Candidatura> {
    return this.http.put<any>(this.API + "/reprovar/" + id, candidatura).pipe(
      map(candidatura => ({
        id:candidatura.id,
        statusCandidatura: candidatura.statusCandidatura,
        vaga: candidatura.vaga,
        usuario: candidatura.usuario,
        devolutiva: candidatura.devolutiva,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
