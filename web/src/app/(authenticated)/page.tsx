'use client';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineEnvironment, AiOutlineHeart, AiFillHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';

import { TEvento } from '@/models/Evento';

import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Evento from '@/components/Evento/Evento';
import { CardUsuario } from '@/components/CardUsuario';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';

export default function HomePage()
{
   const [eventos, setEventos] = useState<TEvento[]>([]);
   
   useEffect(() => {
      //console.log(localStorage.getItem('user'));
      const user = JSON.parse(localStorage.getItem('user')!);
      api.get(`/evento/feed/${user.id}`).then(res => setEventos(res.data));
   }, []);

   return (
      <div className={styles.searchContainer}>
         <div className={styles.searchTop}>
            <Link href="/" className={styles.homeBtn}>
               <AiOutlineHome />
            </Link>
            <div className={styles.search}>
               <input type="text" placeholder="Pesquise por eventos ou usuários" />
               <button type="button">
                  <FiSearch />
               </button>
            </div>
         </div>

         <div className={styles.results}>
            {eventos.map((e, i) =>
               <Evento
                  key={e.id}
                  evento={e}
               />
            )}
         </div>
      </div>
   );
}