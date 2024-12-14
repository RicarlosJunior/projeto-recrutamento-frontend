import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  mensagemErroStatus(erroStatus:number):string{
    console.log('erro'+erroStatus)
    let mensagem = "Ocorreu um erro inesperado.";
    switch (erroStatus) {
      case 401:
        mensagem = 'Você não está autorizado a acessar este recurso.';
        break;
      case 403:
        mensagem = 'Acesso negado! Você não tem permissão para acessar este recurso.';
        break;
      case 500:
        mensagem = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
        break;
    }
    return mensagem;
  }
}
