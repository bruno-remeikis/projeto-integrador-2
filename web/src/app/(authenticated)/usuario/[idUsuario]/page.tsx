'use client';

import { useParams, useRouter } from "next/navigation";

import styles from './styles.module.css';
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { TfiUser } from 'react-icons/tfi';
import Image from "next/image";
import Evento from "@/components/Evento/Evento";

export default function UsuarioPage()
{
   const router = useRouter();
   const params = useParams();

   const usuario = {
      id: params.idUsuario,
      nome: 'Bruno Remeikis',
      email: 'brunocoutinhoremeikis@gmail.com',
      bio: 'Esta é a biografia deste usuário.'
   };

   const eventos = [...Array(30)];

   return (
      <div className={styles.page}>
         <div className={styles.fixedTopbar}>
            <button type="button" className={styles.backBtn} onClick={() => router.back()}>
               <FiArrowLeft />
            </button>
            <div className={styles.fixedInfos}>
               <span className={styles.fixedNome}>{ usuario.nome }</span>
               <span className={styles.fixedQtdEventos}>14 eventos</span>
            </div>
         </div>

         <div className={styles.pageHeader}>
            <div className={styles.fotoCapa}>
               <Image
                  src='/capa-futebol-exemplo.jpg'
                  alt='Foto de capa'
                  //width={20} height={20}
                  fill
                  objectFit="cover"
               />
            </div>
            <div className={styles.underCapa}>
               <div className={styles.foto}>
                  <FiUser />
               </div>
               <div className={styles.underCapaBtns}>
                  <button type="button">Editar perfil</button>
               </div>
            </div>
            <div className={styles.mainInfos}>
               <div className={styles.topInfos}>
                  <h2>{ usuario.nome }</h2>
                  <span>{ usuario.email }</span>
               </div>
               <div className={styles.bio}>
                  <span>{ usuario.bio }</span>
               </div>
               <div className={styles.conexoesInfo}>
                  <div>
                     <span>204</span>
                     <span>&nbsp;Seguindo</span>
                  </div>
                  <div>
                     <span>127</span>
                     <span>&nbsp;Seguidores</span>
                  </div>
               </div>
            </div>
         </div>

         <div className={styles.eventos}>
            {/* Seus Eventos */}
            {eventos.length ? (
               // Eventos
               eventos.map((e, i) =>
                  <Evento
                     key={i}
                     nome={`Meu Evento ${i + 1}`} 
                     data={new Date()}
                     descricao="Descrição do meu evento!!!"
                     local="Não sei onde é"
                     esporte="futebol"
                  />
               )
            ) : (
               // Sem eventos
               <div className={styles.noEvents}>
                  <span>Você ainda não participa de nenhum evento.</span>
                  <button type="button" className={styles.btnNovoEvento}>Criar novo evento</button>
               </div>
            )}
         </div>
      </div>
   );
}