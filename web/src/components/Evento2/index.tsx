'use client';

import { ReactNode } from "react";
import { EventoDescricao } from "./EventoDescricao";

// Icons
import { AiOutlineEnvironment, AiOutlineHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';
// Models
import IEvento from '@/models/Evento';
// Next
import { useRouter } from 'next/navigation';
// Styles
import styles from './Evento.module.css';
import React from 'react';

interface EventoProps {
   children: ReactNode;
   evento: IEvento;
}

export const Evento2 = ({ children, evento }: EventoProps) =>
{
   const router = useRouter();

   /*
   const getChildrenOnDisplayName = (children: React.ReactNode, displayName: string) =>
      React.Children.map(children, (child: any) =>
         child.type.displayName === displayName ? children : null
      );
   */

   function teste(e: any)
   {
      e?.preventDefault();

      const dt = new Date().toLocaleDateString('pt-BR', {
         day: 'numeric',
         month: 'long',
         year: undefined //'numeric',
      });
   
      alert(dt);
   }

   function getEventDate(): string
   {
      return evento.data.toLocaleDateString('pt-BR', {
         day: 'numeric',
         month: 'long',
         year: evento.data.getFullYear() === new Date().getFullYear()
            ? undefined : 'numeric',
      });
   }

   return (
      <div
         className={styles.event}
         //onClick={() => router.push(`/${id}`)}
      >
         <div className={styles.eventHeader}>
            <span className={styles.name}>{ evento.nome }</span>
            <div className={styles.data}>
               <span>Em { getEventDate() }</span>
               <span>&nbsp;&bull;&nbsp;</span>
               <AiOutlineEnvironment />
               <span>{ evento.local }</span>
            </div>
         </div>

         <div className={styles.eventBody}>
            <span>{ evento.descricao }</span>
         </div>

         <div className={styles.eventIcons}>
            <div className={styles.iconGroup}>
               <button type="button" className={styles.icon} onClick={teste} title='Comentários'>
                  <AiOutlineMessage />
                  <span>3</span>
               </button>
               <button type="button" className={styles.icon} title='Curtidas'>
                  <AiOutlineHeart />
                  <span>8</span>
               </button>
               <button type="button" className={styles.icon} title='Compartilhar'>
                  <AiOutlineShareAlt />
               </button>
            </div>
            <div className={styles.iconGroup}>
               <button type="button" className={styles.icon} title='Marcar presença'>
                  <AiOutlineCarryOut />
               </button>
               <button type="button" className={styles.icon} title='Salvar'>
                  <AiOutlineStar />
               </button>
            </div>
         </div>
      </div>
   );
}

Evento2.Descricao = EventoDescricao;