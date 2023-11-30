'use client';

import { api } from '@/services/api';
import styles from './styles.module.css';

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TUsuario } from '@/models/Usuario';
import { useRouter } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';

export default function PesquisarPage()
{
   const router = useRouter();

   const [pesquisa, setPesquisa] = useState<string>('');
   const [usuarios, setUsuarios] = useState<TUsuario[]>([]);

   function handlePesquisa(pesquisa: string)
   {
      setPesquisa(pesquisa);

      if(pesquisa.length === 0) {
         setUsuarios([]);
         return;
      }

      api.get(`/usuario/pesquisar?pesquisa=${pesquisa}`)
         .then(res => setUsuarios(res.data));
   }

   return (
      <div className={styles.page}>
         <div className={`search ${styles.search}`}>
            <input type="text"
               placeholder="Nome do usuário"
               onChange={e => handlePesquisa(e.target.value)}
            />
            <button type="button" onClick={e => handlePesquisa(pesquisa)}>
               <FiSearch />
            </button>
         </div>

         <div className={styles.usuarios}>
            {usuarios.length > 0
               ? usuarios.map(u =>
                  <div key={u.id}
                     className={styles.usuario}
                     onClick={() => router.push(`/usuario/${u.id}`)}
                  >
                     <span className={styles.img}>
                        <AiOutlineUser />
                     </span>
                     <span className={styles.nome}>{ u.nome }</span>
                  </div>   
               )
               : <span>{ !pesquisa ? 'Encontre usuários e conexte-se!' : 'Nenhum resultado encontrado' }</span>}
         </div>
      </div>
   )
}