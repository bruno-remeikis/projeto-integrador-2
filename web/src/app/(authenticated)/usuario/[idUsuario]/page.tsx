'use client';

import { useParams, useRouter } from "next/navigation";

import styles from './styles.module.css';
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { FiCamera } from 'react-icons/fi';
import Image from "next/image";
import Evento from "@/components/Evento";
import { TUsuario } from "@/models/Usuario";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { TEvento } from "@/models/Evento";
import { configWithUser, user } from "@/services/UserService";
import { useEventos } from "@/context/EventosContext";
import Link from "next/link";
import { FixedTopbar } from "@/components/FixedTopbar";
import { TConexaoUsuarios } from "@/models/ConexaoUsuarios";
import { ModalUsuarios } from "@/components/ModalUsuarios";
import { firstWordOf } from "@/utils/StringUtil";

export default function UsuarioPage()
{
   const router = useRouter();
   const params = useParams();
   const { addEventoFeed, removerEventoFeed, addMeuEvento, removerMeuEvento } = useEventos();

   const [usuario, setUsuario] = useState<TUsuario>();

   const [modalSeguindoIsOpen, setModalSeguindoIsOpen] = useState<boolean>(false);
   const [modalSeguidoresIsOpen, setModalSeguidoresIsOpen] = useState<boolean>(false);
   const [seguindo, setSeguindo] = useState<TUsuario[]>([]);
   const [seguidores, setSeguidores] = useState<TUsuario[]>([]);

   const [eventos, setEventos] = useState<TEvento[]>([]);

   function handleSeguir()
   {
      const data: TConexaoUsuarios = {
         idSeguidor: user?.id!,
         idSeguido: usuario?.id!
      }

      api.post('/conexaoUsuarios', data).then(_ =>
      {
         setUsuario(u => !u
            ? undefined
            : {
               ...u,
               qtdSeguidores: u.qtdSeguidores! + 1,
               sessionSeguindo: true
            }
         );
      });
   }

   function handlePararSeguir()
   {
      api.delete(`/conexaoUsuarios?idSeguido=${usuario?.id!}`, configWithUser).then(res =>
      {
         setUsuario(u => !u
            ? undefined
            : {
               ...u,
               qtdSeguidores: u.qtdSeguidores! - 1,
               sessionSeguindo: false
            }
         );
      });
   }

   async function handleOpenSeguindo()
   {
      setSeguindo((await api.get(`/conexaoUsuarios/seguindo/${usuario?.id}`)).data);
      setModalSeguindoIsOpen(true);
   }

   async function handleOpenSeguidores()
   {
      setSeguidores((await api.get(`/conexaoUsuarios/seguidores/${usuario?.id}`)).data);
      setModalSeguidoresIsOpen(true);
   }

   useEffect(() =>
   {
      api.get(`/usuario/${params.idUsuario}`, configWithUser).then(resU =>
      {
         setUsuario(resU.data);

         api.get(`/evento/eventosUsuario/${resU.data.id}`, configWithUser)
            .then(resE => setEventos(resE.data));
      });
   }, []);

   return (
      <>
      <ModalUsuarios
         isOpen={modalSeguindoIsOpen}
         setIsOpen={setModalSeguindoIsOpen}
         usuarios={seguindo}
         title={`Seguidos por ${firstWordOf(usuario?.nome)}`}
      />

      <ModalUsuarios
         isOpen={modalSeguidoresIsOpen}
         setIsOpen={setModalSeguidoresIsOpen}
         usuarios={seguidores}
         title={`Seguidores de ${firstWordOf(usuario?.nome)}`}
      />

      <div className={styles.page}>
         <FixedTopbar>
            <span className={styles.fixedNome}>{ usuario?.nome }</span>
            <span className={styles.fixedQtdEventos}>{ eventos.length } eventos</span>
         </FixedTopbar>

         <div className={styles.pageHeader}>
            <div className={styles.fotoCapa}>
               {usuario?.fotoCapa
                  ? <Image
                     src='/capa-futebol-exemplo.jpg'
                     alt='Foto de capa'
                     //width={20} height={20}
                     fill
                     objectFit="cover"
                  />
                  : <FiCamera />}
            </div>
            <div className={styles.underCapa}>
               <div className={styles.foto}>
                  <FiUser />
               </div>
               <div className={styles.underCapaBtns}>
               {user?.id === usuario?.id
                  ? null //<button type="button">Editar perfil</button>
                  : (
                     usuario?.sessionSeguindo
                        ? <button type="button" onClick={handlePararSeguir}>Parar de seguir</button>
                        : <button type="button" className={styles.btnSeguir} onClick={handleSeguir}>Seguir</button>
                  )}
               </div>
            </div>
            <div className={styles.mainInfos}>
               <div className={styles.topInfos}>
                  <h2>{ usuario?.nome }</h2>
                  <span>{ usuario?.email }</span>
               </div>
               <div className={styles.bio}>
                  <span>{ usuario?.bio }</span>
               </div>
               <div className={styles.conexoesInfos}>
                  <div className={styles.btnConexoes} onClick={handleOpenSeguindo}>
                     <span>{ usuario?.qtdSeguindo! }</span>
                     <span>&nbsp;Seguindo</span>
                  </div>
                  <div className={styles.btnConexoes} onClick={handleOpenSeguidores}>
                     <span>{ usuario?.qtdSeguidores! }</span>
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
                     evento={e}
                     onMarcarPresenca={() => {
                        if(e.presente) {
                           e.presente = false;
                           if(e.qtdPresencas !== undefined)
									   e.qtdPresencas--;
                           addEventoFeed(e);
                           removerMeuEvento(e.id!);
                        }
                        else {
                           e.presente = true;
                           if(e.qtdPresencas !== undefined)
									   e.qtdPresencas++;
                           addMeuEvento(e);
                           removerEventoFeed(e.id!);
                        }
                     }}
                  />
               )
            ) : (
               // Sem eventos
               <div className={styles.noEvents}>
                  <span>Você ainda não criou nenhum evento.</span>
                  <Link className={styles.btnNovoEvento} href='/'>Voltar ao Feed</Link>
               </div>
            )}
         </div>
      </div>

      </>
   );
}