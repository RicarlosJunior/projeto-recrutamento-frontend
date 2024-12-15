import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = "http://localhost:8080/auth/login";

  constructor(private http: HttpClient, private router: Router) { }

  logar(email:string, senha:string){
    return this.http.post<any>(this.API,{email,senha}).pipe(
      tap((value) => {

        if (!value.token || value.id === 0) {
          throw new Error('Email e/ou senha inválidos.');
        }
        sessionStorage.setItem("id", value.id);
        sessionStorage.setItem("nome", value.nome);
        sessionStorage.setItem("email", value.email);
        sessionStorage.setItem("role", value.tipo);
        sessionStorage.setItem("token", value.token);
      }),
      catchError((error) => {
        if(error.message !== 'Email e/ou senha inválidos.'){
          error.message = 'Falha na autenticação. Tente novamente mais tarde.';
        }
        return throwError(() => new Error(error.message));
      })
    )
  }

  sair(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  autenticado(): boolean {
    const token = sessionStorage.getItem('token'); 
    return !!token;  // Retorna true se o token existir, caso contrário, false
  }


}
