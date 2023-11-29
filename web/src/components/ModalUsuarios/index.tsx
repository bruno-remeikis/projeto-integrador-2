'use client';

import styles from './styles.module.css';
import { TUsuario } from "@/models/Usuario";
import { Modal, ModalProps } from "../Modal";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";

type ModalUsuariosProps = Omit<ModalProps, 'children'> & {
   usuarios: TUsuario[];
}

export function ModalUsuarios({ isOpen, setIsOpen, title, usuarios }: ModalUsuariosProps)
{
   const router = useRouter();

   return (
      <Modal
         //className={styles.modalUsuarios}
         style={{ padding: '0.6rem 0 0.4rem 0' }}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         minWidth='20rem'
         title={title}
         titleStyle={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '0.2rem' }}
      >
         {usuarios.length > 0
            ?usuarios.map(u =>
               <div key={u.id}
                  className={styles.usuario}
                  onClick={() => {
                     setIsOpen(false);
                     router.push(`/usuario/${u.id}`);
                  }}
               >
                  <span className={styles.img}>
                     <AiOutlineUser />
                  </span>
                  <span className={styles.nome}>{ u.nome }</span>
               </div>
            )
            : <span className={styles.nenhum}>Nenhum</span>}
      </Modal>
   );
}