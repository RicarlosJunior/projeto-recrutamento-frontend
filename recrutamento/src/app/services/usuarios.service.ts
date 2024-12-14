import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API = "http://localhost:8080/api/usuarios";

  constructor(private http: HttpClient) { }


  listar(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.API).pipe(
      map(usuariosRecebidos =>
        usuariosRecebidos.map(usuario => ({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          tipoUsuario: usuario.tipoUsuario,
        })),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      )
    );
  }

  excluir(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/" + id, { responseType: 'text' as 'json' });
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(this.API, usuario).pipe(
      map(vaga => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipoUsuario: usuario.tipoUsuario,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  alterar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<any>(this.API + "/" + id, usuario).pipe(
      map(venda => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipoUsuario: usuario.tipoUsuario,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  consultar(id: number): Observable<Usuario> {
    return this.http.get<any>(this.API + "/" + id).pipe(
      map(usuario => ({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipoUsuario: usuario.tipoUsuario,
      })),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

}
