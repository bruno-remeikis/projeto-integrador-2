// https://medium.com/@marioserano55/cleaner-codes-react-subcomponents-1c2ebe178566
// https://www.youtube.com/watch?v=oPOKpSFqy-I&vl=pt-BR
'use client';

// Icons
import { AiOutlineUser, AiOutlineEnvironment, AiOutlineHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';
// Models
import { TEvento } from '@/models/Evento';
// Next
import { useRouter } from 'next/navigation';
// Styles
import styles from './Evento.module.css';
import React, { SyntheticEvent, useState } from 'react';
import { formatDate } from '@/utils/DateUtil';
import { api } from '@/services/api';
import { user } from '@/services/UserService';
import { Modal } from '../Modal';
import { TUsuario } from '@/models/Usuario';

type EventoProps = {
   evento: TEvento;
   onMarcarPresenca: () => void;

   displayDescricao?: boolean;
   displayIcons?: boolean;
}

// Evento
const Evento = ({ evento, onMarcarPresenca, displayDescricao, displayIcons }: EventoProps) =>
{
   const id = evento.id ? evento.id : 0;
   const { nome, nomeEsporte, nomeUsuario, descricao, local, dtEvento, qtdPresencas, presente } = evento;

   const router = useRouter();

   const [modalParticipantesOpen, setModalParticipantesOpen] = useState<boolean>(false);
   const [participantes, setParticipantes] = useState<TUsuario[]>([]);

   function handleMarcarPresenca(e: SyntheticEvent)
   {
      e.stopPropagation(); // <- Impede que redireciona à pagina do evento ao clicar

      api.post(`/presencaEvento?idUsuario=${user?.id}&idEvento=${id}`, null)
         .then(res => onMarcarPresenca());
   }

   function handleMostrarParticipantes(e: SyntheticEvent)
   {
      e.stopPropagation();

      if(qtdPresencas === 0)
         return;

      api.get(`/presencaEvento/participantes/${id}`).then(res =>
      {
         setParticipantes(res.data);
         setModalParticipantesOpen(true);
      });
   }

	return (
      <>
      <Modal
         isOpen={modalParticipantesOpen}
         setIsOpen={setModalParticipantesOpen}
      >
         {participantes.map(p =>
            <span>{ p.nome }</span>)}
      </Modal>

      <div
         className={styles.event}
         onClick={() => router.push(`/evento/${id}`)}
      >
         <div className={styles.eventHeader}>
            <div className={styles.topInfo}>
               <span style={{ fontSize: '0.6rem' }}>Por { nomeUsuario }</span>
               <span style={{ fontSize: '0.7rem' }}>{ nomeEsporte }</span>
            </div>
            <div>
               <span className={styles.name}>{ nome }</span>
            </div>
            <div className={styles.data}>
               <span>Em { formatDate(dtEvento) }</span>
               <span>&nbsp;&bull;&nbsp;</span>
               <AiOutlineEnvironment />
               <span>{ local }</span>
            </div>
         </div>

         {(displayDescricao === undefined || displayDescricao) &&
         <div className={styles.eventBody}>
            <span>{ descricao }</span>
         </div>}

         {(displayIcons === undefined || displayIcons) &&
         <div className={styles.eventIcons}>
            {/*<div className={styles.iconGroup}>
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
            </div>*/}
            <div className={styles.iconGroup}>
               <div
                  className={styles.icon}
                  title='Participantes'
                  onClick={handleMostrarParticipantes}
               >
                  <AiOutlineUser />
                  <span>{ qtdPresencas }</span> 
               </div>
            </div>
            <div className={styles.iconGroup}>
               {/* Botão "Participar" ou "Participando"/"Sair" */}
               <div
                  className={`
                     ${styles.marcarPresenca}
                     ${presente ? styles.presente : styles.ausente}
                  `}
                  title={`${presente ? 'Desmarcar' : 'Marcar'} presença`}
                  onClick={handleMarcarPresenca}
               >
                  <AiOutlineCarryOut />   
               </div>
            </div>
         </div>}
      </div>
      </>
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