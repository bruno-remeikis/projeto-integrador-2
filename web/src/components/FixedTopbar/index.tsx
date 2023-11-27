'use client';

import { FiArrowLeft } from 'react-icons/fi';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

type FixedTopbarProps = {
   children: React.ReactNode;
}

export const topbarHeight = '2.8rem';

export function FixedTopbar({ children }: FixedTopbarProps)
{
   const router = useRouter();

   return (
      <>
         <div className={styles.fixedTopbar} style={{ height: topbarHeight }}>
            <button type="button" className={styles.backBtn} onClick={() => router.back()}>
               <FiArrowLeft />
            </button>
            <div className={styles.fixedInfos}>
               { children }
            </div>
         </div>

         <div style={{ height: topbarHeight, position: 'relative' }} />
      </>
   );
}