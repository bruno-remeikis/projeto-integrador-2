import { TUsuario } from "@/models/Usuario";

export const user: TUsuario = (() =>
{
   if(localStorage) {
      const str = localStorage.getItem('user');
      if(str)
         return JSON.parse(str);
   }

   return { nome: '', email: '', bio: '' }; // <- Gambiarra
})();