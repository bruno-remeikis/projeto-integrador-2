// https://medium.com/@marioserano55/cleaner-codes-react-subcomponents-1c2ebe178566
// https://www.youtube.com/watch?v=oPOKpSFqy-I&vl=pt-BR
'use client';

// Icons
import { AiOutlineEnvironment, AiOutlineHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';
// Models
import IEvento from '@/models/Evento';
// Next
import { useRouter } from 'next/navigation';
// Styles
import styles from './Evento.module.css';
import React from 'react';

// interface EventoProps {
//    evento: IEvento;
// }
interface EventoProps extends IEvento {
   displayIcons?: boolean;
}

// Evento
const Evento = ({ id, nome, data, descricao, local, displayIcons }: EventoProps) =>
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
      return data.toLocaleDateString('pt-BR', {
         day: 'numeric',
         month: 'long',
         year: data.getFullYear() === new Date().getFullYear()
            ? undefined : 'numeric',
      });
   }

	return (
      <div
         className={styles.event}
         onClick={() => router.push(`/evento/${id}`)}
      >
         <div className={styles.eventHeader}>
            <span className={styles.name}>{ nome }</span>
            <div className={styles.data}>
               <span>Em { getEventDate() }</span>
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