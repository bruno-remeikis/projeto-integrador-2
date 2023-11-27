import { TUsuario } from "@/models/Usuario";
import { AxiosRequestConfig } from "axios";

export const user: TUsuario | null = (() =>
{
   if(typeof window !== 'undefined') {
      const str = localStorage.getItem('user');
      if(str)
         return JSON.parse(str);
   }

   return null; //{ nome: '', email: '', bio: '' }; // <- Gambiarra
})();

export const configWithUser: AxiosRequestConfig = { headers: { 'user': user?.id } };