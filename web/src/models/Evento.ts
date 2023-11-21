export type TEvento =
{
   id?: number;
   nome: string;
   idUsuarioCriador: number;
   idEsporte: number;
   dtEvento: Date;
   descricao: string;
   local: string;

   nomeUsuario?: string;
   nomeEsporte?: string;
   qtdPresencas?: number;
   presente?: boolean;
}