'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Modal, ModalProps } from '../Modal';
import styles from './CriarEventoModal.module.css';
import { api } from '@/services/api';
import { TEvento } from '@/models/Evento';
import { TEsporte } from '@/models/Esporte';
import { user } from '@/services/UserService';
//import Modal from 'react-modal';

type CriarEventoModalProps = Omit<ModalProps, 'children'> & {

}

export const CriarEventoModal = ({ isOpen, setIsOpen }: CriarEventoModalProps) =>
{
   const [esportes, setEsportes] = useState<TEsporte[]>([]);
   const [nome, setNome] = useState<string>('');
   const [idEsporte, setIdEsporte] = useState<number>(0);
   const [local, setLocal] = useState<string>('');
   const [dtEvento, setDtEvento] = useState<string>('');
   const [descricao, setDescricao] = useState<string>('');

   function handleSubmit(e: FormEvent<HTMLFormElement>)
   {
      e.preventDefault();

      if(!nome || idEsporte <= 0 || !local || !dtEvento || !descricao) {
         alert('Preencha todos os campos!');
         return;
      }

      const data: TEvento = {
         nome,
         idUsuarioCriador: user?.id!,
         idEsporte,
         local,
         dtEvento: new Date(dtEvento),
         descricao
      }
      
      api.post('/evento', data)
         .then(res => setIsOpen(false));
   }

   useEffect(() =>
   {
      api.get('/esporte')
         .then(res => setEsportes(res.data));
   }, []);

   return(
      <Modal
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         title="Novo Evento"
         width="50rem"
         minWidth="25rem"
         style={{ padding: '0.4rem 2rem 1rem 2rem' }}
      >
         <form className="form" onSubmit={handleSubmit}>
            <div className="inline-form-group">
               <div style={{ flexGrow: 1 }}>
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
               </div>
               <div>
                  <label htmlFor="esporte">Esporte</label>
                  <select id="esporte" value={idEsporte} onChange={e => setIdEsporte(+ e.target.value)}>
                     <option disabled value={0}></option>
                     {esportes.map(esporte =>
                        <option key={esporte.id} value={esporte.id}>{ esporte.nome }</option>
                     )}
                  </select>
               </div>
            </div>
            <div className="inline-form-group">
               <div style={{ flexGrow: 1 }}>
                  <label htmlFor="local">Local</label>
                  <input id="local" type="text" value={local} onChange={e => setLocal(e.target.value)} />
               </div>
               <div>
                  <label htmlFor="data">Data</label>
                  <input id="data" type="datetime-local" value={dtEvento} onChange={e => setDtEvento(e.target.value)} />
               </div>
            </div>
            <div>
               <label htmlFor="descricao">Descrição</label>
               <textarea id="descricao" rows={4} maxLength={255} value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>

            <div className={styles.control}>
               <button type="submit" className="btn green-btn">Criar Evento</button>
               <button type="button" className="btn red-btn" onClick={() => setIsOpen(false)}>Cancelar</button>
            </div>
         </form>
      </Modal>
   );
}