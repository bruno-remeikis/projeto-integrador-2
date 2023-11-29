export type TUsuario =
{
   id?: number;
   nome: string;
   email: string;
   bio: string;
   foto?: any;
   fotoCapa?: any;
   dtInsert?: Date;

   qtdSeguidores?: number;
   qtdSeguindo?: number;
   sessionSeguindo?: boolean;
}