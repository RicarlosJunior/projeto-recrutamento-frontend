import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  mensagemErroStatus(erroStatus:number):string{
    let mensagem = "Não foi possível realizar essa operação.";
    switch (erroStatus) {
      case 401:
        mensagem = 'Acesso não autorizado. Token inválido ou ausente. Por favor, faça login.';
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
