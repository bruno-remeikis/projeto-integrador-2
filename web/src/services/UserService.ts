import { TUsuario } from "@/models/Usuario";

export const user: TUsuario | null = (() =>
{
   if(typeof window !== 'undefined') {
      const str = localStorage.getItem('user');
      if(str)
         return JSON.parse(str);
   }

   return null; //{ nome: '', email: '', bio: '' }; // <- Gambiarra
})();