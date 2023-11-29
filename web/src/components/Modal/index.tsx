'use client';

import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;

   title?: string;
   titleStyle?: React.CSSProperties;
   width?: string;
   minWidth?: string;
   maxWidth?: string;

   children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, title, titleStyle, width, minWidth, maxWidth, children, className, style, ...props }: ModalProps) =>
{
   return (
      <div
         className={`${styles.overlay} ${className}`}
         style={{ display: isOpen ? 'flex' : 'none', ...style }}
         {...props}
         onClick={() => setIsOpen(false)}
      >
         <div
            className={styles.containerColumn}
            style={{ width, minWidth, maxWidth }}
            onClick={e => e.stopPropagation()}
         >
            <div className={styles.container} style={style}>

               <div className={styles.header}>
                  {title &&
                     <span
                        className={styles.title}
                        style={titleStyle}
                     >{ title }</span>}

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