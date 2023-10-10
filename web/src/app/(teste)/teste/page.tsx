'use client';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineEnvironment, AiOutlineHeart, AiFillHeart, AiOutlineCarryOut, AiOutlineMessage, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai';

import IEvento from '@/models/Evento';

import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EventoProps extends IEvento {};

function Evento({ id, nome, data, descricao, local }: EventoProps)
{
   const router = useRouter();

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
         //onClick={() => router.push(`/${id}`)}
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

export default function Home()
{
   return (
      <div className={styles.searchContainer}>
         <div className={styles.searchTop}>
            <Link href="/" className={styles.homeBtn}>
               <AiOutlineHome />
            </Link>
            <div className={styles.search}>
               <input type="text" />
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