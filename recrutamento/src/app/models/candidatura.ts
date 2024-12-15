import { Usuario } from "./usuario";
import { Vaga } from "./vaga";

export class Candidatura {
    id:number | null = null;
    statusCandidatura:string | null = null;
    vaga:Vaga | null = null;
    usuario:Usuario | null = null;
    devolutiva:string = "";
}