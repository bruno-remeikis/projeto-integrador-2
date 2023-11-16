'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';

export type ModalProps = {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;

   title?: string;
   style?: React.CSSProperties;
   width?: string;
   minWidth?: string;
   maxWidth?: string;

   children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, title, style, width, minWidth, maxWidth, children }: ModalProps) =>
{
   return (
      <div className={styles.overlay} style={{ display: isOpen ? 'flex' : 'none' }}>
         <div className={styles.containerColumn} style={{ width, minWidth, maxWidth }}>
            <div className={styles.container} style={style}>

               <div className={styles.header}>
                  {title &&
                     <span className={styles.title}>{ title }</span>}

                  <div className={styles.control}>
                     <button type="button" onClick={() => setIsOpen(false)}>
                        <FiX />
                     </button>
                  </div>
               </div>

               <div className="content">
                  { children }
               </div>
            </div>
         </div>
      </div>
   );
}