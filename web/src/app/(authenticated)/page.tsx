//'use client';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineEnvironment, AiOutlineHeart, AiFillHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';

import IEvento from '@/models/Evento';

import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Evento from '@/components/Evento/Evento';
import { CardUsuario } from '@/components/CardUsuario';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function HomePage()
{
   const session = await getServerSession(authOptions);

   return (
      <div className={styles.searchContainer}>
         {session
            ? <span>Usuário logado!!! {JSON.stringify(session)}</span>
            : <span>Não logado</span>
         }

         <Link href='/api/auth/signin'>Entrar</Link>

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
            {[...new Array(10)].map((e, i) =>
               <Evento
                  key={i}
                  nome={`Evento ${(i + 1)}`}
                  data={new Date()}
                  descricao="Esta é a descrição do evento."
                  local="Bola Show. Tabuazeiro, Vitória"
                  esporte="Futebol"
               />
            )}
         </div>
      </div>
   );
}