export class Vaga {
    id:number | null = null;
    titulo:string | null = null;
    descricao:string | null = null;
    requisitos:string[] = [];
    responsavelId:number | null = null;
    statusVaga:string = "ABERTA";
}