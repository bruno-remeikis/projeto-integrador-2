'use client';

import { TEvento } from "@/models/Evento";
import { configWithUser, user } from "@/services/UserService";
import { api } from "@/services/api";
import { formatDate } from "@/utils/DateUtil";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Link from 'next/link';

import styles from './styles.module.css';
import { AiOutlineEnvironment } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { FixedTopbar } from "@/components/FixedTopbar";

export default function EventoPage()
{
   const params = useParams();
   const router = useRouter();

   const [evento, setEvento] = useState<TEvento | undefined>(undefined);

   useEffect(() =>
   {
      api.get(`/evento/${params.idEvento}`, configWithUser)
         .then(res => setEvento(res.data));
   }, []);

   return (
      <div className={styles.container}>

         <FixedTopbar>
            <span className={styles.fixedNome}>{ evento?.nome }</span>
            <span className={styles.fixedQtdParticipantes}>{ evento?.qtdPresencas } participantes</span>
         </FixedTopbar>

         <div className={styles.imgEvento} />

         <div className={styles.header}>
            <div className={styles.top}>
               <Link href={`/usuario/${evento?.idUsuarioCriador}`}>Por { evento?.nomeUsuario }</Link>
               <span>{ evento?.nomeEsporte }</span>
            </div>
            <h3>{ evento?.nome }</h3>
            <div className={styles.data}>
               <span>Em { formatDate(evento?.dtEvento) }</span>
               <span>&nbsp;&bull;&nbsp;</span>
               <AiOutlineEnvironment />
               <span>{ evento?.local }</span>
            </div>
         </div>

         <div className={styles.body}>
            <span>{ evento?.qtdPresencas } participantes</span>
         </div>

      </div>
   );
}