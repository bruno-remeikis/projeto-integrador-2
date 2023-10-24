'use client';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineEnvironment, AiOutlineHeart, AiFillHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';

import IEvento from '@/models/Evento';

import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Evento from '@/components/Evento/Evento';

export default function HomePage()
{
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

         {[...Array(10)].map((e, i) =>
            <Evento
               key={i}
               nome={`Evento ${i}`}
               data={new Date()}
               descricao='Esta é a descrição deste evento. Todos estão convidados!'
               local='Bola Show - Tabuazeiro, Vitória'
               esporte='Volei'
            />
         )}
      </div>
   );
}