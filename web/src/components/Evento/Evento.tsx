// https://medium.com/@marioserano55/cleaner-codes-react-subcomponents-1c2ebe178566
// https://www.youtube.com/watch?v=oPOKpSFqy-I&vl=pt-BR
'use client';

// Icons
import { AiOutlineEnvironment, AiOutlineHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';
// Models
import { TEvento } from '@/models/Evento';
// Next
import { useRouter } from 'next/navigation';
// Styles
import styles from './Evento.module.css';
import React from 'react';
import { formatDate } from '@/utils/DateUtil';

type EventoProps = {
   evento: TEvento;
   displayIcons?: boolean;
}

// Evento
const Evento = ({ evento, displayIcons }: EventoProps) =>
{
   const id = evento.id ? evento.id : 0;
   const { nome, nomeEsporte, descricao, local, dtEvento } = evento;

   const router = useRouter();

	return (
      <div
         className={styles.event}
         onClick={() => router.push(`/evento/${id}`)}
      >
         <div className={styles.eventHeader}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span className={styles.name}>{ nome }</span>
               <span style={{ fontSize: '0.7rem' }}>{ nomeEsporte }</span>
            </div>
            <div className={styles.data}>
               <span>Em { formatDate(dtEvento) }</span>
               <span>&nbsp;&bull;&nbsp;</span>
               <AiOutlineEnvironment />
               <span>{ local }</span>
            </div>
         </div>

         <div className={styles.eventBody}>
            <span>{ descricao }</span>
         </div>

         {(displayIcons === undefined || displayIcons === true) &&
         <div className={styles.eventIcons}>
            <div className={styles.iconGroup}>
               <button type="button" className={styles.icon} title='Comentários'>
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
         </div>}
      </div>
	);
}
export default Evento;

/*
// Header
const Header = () => {
   return (
      <div className={styles.eventHeader}>
         <span className={styles.name}>{ nome }</span>
         <div className={styles.data}>
            <span>Em { getEventDate() }</span>
            <span>&nbsp;&bull;&nbsp;</span>
            <AiOutlineEnvironment />
            <span>{ local }</span>
         </div>
      </div>
   );
}
Header.displayName = "Header";
Evento.Header = Header;

// StatusIcons
const StatusIcons = () => {
   return (

   );
}
StatusIcons.displayName = "StatusIcons";
Evento.StatusIcons = StatusIcons;
*/