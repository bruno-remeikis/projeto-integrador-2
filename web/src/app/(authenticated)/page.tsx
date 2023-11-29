'use client';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineEnvironment, AiOutlineHeart, AiFillHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';

import { TEvento } from '@/models/Evento';

import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Evento from '@/components/Evento';
import { CardUsuario } from '@/components/CardUsuario';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { user } from '@/services/UserService';
import { useEventos } from '@/context/EventosContext';

export default function HomePage()
{
   const { feed, setFeed, removerEventoFeed, addMeuEvento } = useEventos();

   const [pesquisa, setPesquisa] = useState<string>('');
   const [feedPesquisa, setFeedPesquisa] = useState<TEvento[]>(feed);

   useEffect(() => {
      api.get(`/evento/feed/${user?.id}`).then(res =>
      {
         setFeed(res.data);
         setFeedPesquisa(res.data);
      });
   }, []);

   function handlePesquisa(pesquisa: string)
   {
      setPesquisa(pesquisa);

      setFeedPesquisa(feed.filter(e =>
      {
         const auxPesquisa = pesquisa.toUpperCase().trim();

         console.log(e);

         return (
            e.nome.toUpperCase().includes(auxPesquisa) ||
            e.local.toUpperCase().includes(auxPesquisa) ||
            e.nomeEsporte?.toUpperCase().includes(auxPesquisa) ||
            e.nomeUsuario?.toUpperCase().includes(auxPesquisa)
         );
      }));
   }

   return (
      <div className={styles.searchContainer}>
         <div className={styles.searchTop}>
            {/*<Link href="/" className={styles.homeBtn}>
               <AiOutlineHome />
            </Link>*/}
            <div className={styles.search}>
               <input type="text"
                  placeholder="Pesquise por eventos ou usuários"
                  onChange={e => handlePesquisa(e.target.value)}
               />
               <button type="button" onClick={e => handlePesquisa(pesquisa)}>
                  <FiSearch />
               </button>
            </div>
         </div>

         <div className={styles.results}>
            {feed.length > 0
               ? feedPesquisa.map(e =>
                  <Evento
                     key={e.id}
                     evento={e}
                     onMarcarPresenca={() => {
                        e.presente = true;
                        if(e.qtdPresencas !== undefined)
									e.qtdPresencas++;
                        addMeuEvento(e);
                        removerEventoFeed(e.id!);
                     }}
                  />
               )
               : <span style={{ color: 'white', textAlign: 'center', marginTop: '6rem' }}>Sem novos eventos pra você.</span>}
         </div>
      </div>
   );
}