'use client';

import { useParams } from "next/navigation"

export default function EventoPage()
{
   const params = useParams();

   console.log(params);

   return (
      <>
         <h3>Página do Evento</h3>
         <span>ID: { params.idEvento }</span>
      </>
   );
}