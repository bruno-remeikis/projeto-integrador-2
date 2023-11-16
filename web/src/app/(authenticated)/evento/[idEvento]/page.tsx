'use client';

import { TEvento } from "@/models/Evento";
import { api } from "@/services/api";
import { formatDate } from "@/utils/DateUtil";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function EventoPage()
{
   const params = useParams();

   const [evento, setEvento] = useState<TEvento | undefined>(undefined);

   useEffect(() =>
   {
      api.get(`/evento/${params.idEvento}`).then(res =>
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