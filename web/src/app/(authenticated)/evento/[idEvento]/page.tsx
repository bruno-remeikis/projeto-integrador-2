'use client';

import { TEvento } from "@/models/Evento";
import { user } from "@/services/UserService";
import { api } from "@/services/api";
import { formatDate } from "@/utils/DateUtil";
import { AxiosRequestConfig } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function EventoPage()
{
   const params = useParams();

   const [evento, setEvento] = useState<TEvento | undefined>(undefined);

   useEffect(() =>
   {
      const config: AxiosRequestConfig = { headers: { 'user': user.id } };

      api.get(`/evento/${params.idEvento}`, config).then(res =>
      {
         setEvento(res.data);
      });
   }, []);

   return (
      <>
         <h3>{ evento?.nome }</h3>
         <span>{ formatDate(evento?.dtEvento) }</span>
         <span>ID: { params.idEvento }</span>
         <span>{ JSON.stringify(evento) }</span>
      </>
   );
}