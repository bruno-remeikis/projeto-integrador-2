'use client';

import { useEffect, useState } from 'react';
import { Modal, ModalProps } from '../Modal';
import styles from './CriarEventoModal.module.css';
import { api } from '@/services/api';
import { TEvento } from '@/models/Evento';
//import Modal from 'react-modal';

type CriarEventoModalProps = Omit<ModalProps, 'children'> & {

}

export const CriarEventoModal = ({ isOpen, setIsOpen }: CriarEventoModalProps) =>
{
   const [esportes, setEsportes] = useState<any[]>([]);

   function handleSubmit(e: any)
   {
      e.preventDefault();

      const data/*: TEvento*/ = {

      }

      api.post('/evento', data).then(res =>
      {
         setIsOpen(false);
      });
   }

   useEffect(() =>
   {
      setEsportes([
         { id: 1, nome: 'Futebol' },
         { id: 2, nome: 'Volei' }
      ]);
   }, []);

   return(
      <Modal
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         title="Novo Evento"
         width="50rem"
         minWidth="25rem"
      >
         <form className="form" onSubmit={handleSubmit}>
            <div className="inline-form-group">
               <div style={{ flexGrow: 1 }}>
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" />
               </div>
               <div>
                  <label htmlFor="esporte">Esporte</label>
                  <select id="esporte">
                     {esportes.map(esporte =>
                        <option key={esporte.id} value={esporte.id}>{ esporte.nome }</option>
                     )}
                  </select>
               </div>
            </div>
            <div className="inline-form-group">
               <div style={{ flexGrow: 1 }}>
                  <label htmlFor="local">Local</label>
                  <input id="local" type="text" />
               </div>
               <div>
                  <label htmlFor="data">Data</label>
                  <input id="data" type="datetime-local" />
               </div>
            </div>
            <div>
               <label htmlFor="descricao">Descrição</label>
               <textarea id="descricao" rows={4} maxLength={255} />
            </div>

            <div className={styles.control}>
               <button type="submit" className="btn green-btn">Criar Evento</button>
               <button type="button" className="btn red-btn" onClick={() => setIsOpen(false)}>Cancelar</button>
            </div>
         </form>
      </Modal>
   );
}