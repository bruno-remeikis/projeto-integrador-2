'use client';

//import Modal from 'react-modal';
import { Modal } from 'react-responsive-modal';

export const CriarEventoModal = () =>
{
   return(
      <Modal
         open={true}
         onClose={() => {}}
         center
      >
         <h4>Teste</h4>
      </Modal>
   );
}