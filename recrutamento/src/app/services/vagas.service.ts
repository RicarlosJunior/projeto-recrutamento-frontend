import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Vaga } from '../models/vaga';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  API = "http://localhost:8080/api/vagas";

  constructor(private http: HttpClient) { }


  criar(vaga: Vaga): Observable<Vaga> {
    return this.http.post<any>(this.API, vaga).pipe(
      map(vaga => ({
        id: vaga.id,
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        requisitos: vaga.requisitos,
        responsavelId: vaga.responsavelId,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  alterar(id: number, vaga: Vaga): Observable<Vaga> {
    return this.http.put<any>(this.API + "/" + id, vaga).pipe(
      map(venda => ({
        id: vaga.id,
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        requisitos: vaga.requisitos,
        responsavelId: vaga.responsavelId,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  listar(): Observable<Vaga[]> {
    return this.http.get<any[]>(this.API).pipe(
      map(vagasRececibdas =>
        vagasRececibdas.map(vaga => ({
          id: vaga.id,
          titulo: vaga.titulo,
          descricao: vaga.descricao,
          requisitos: vaga.requisitos,
          responsavelId: vaga.responsavelId,
        }))
        ,
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      )
    );
  }


  excluir(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/" + id, { responseType: 'text' as 'json' });
  }

  consultar(id: number): Observable<Vaga> {
    return this.http.get<any>(this.API + "/" + id).pipe(
      map(vaga => ({
        id: vaga.id,
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        requisitos: vaga.requisitos,
        responsavelId: vaga.responsavelId,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
