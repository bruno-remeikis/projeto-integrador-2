import styles from './Card.module.css';

export default function Card()
{
   return (
      <div className={styles.card}>
         <div className={styles.gradient} style={{ width: '70%', height: '2rem' }}></div>

         <div className={styles.gradient} style={{ width: '50%', height: '6rem', margin: '0.8rem 0' }}></div>

         <div className={styles.gradient} style={{ width: '100%', height: '2rem' }}></div>
         <div className={styles.gradient} style={{ width: '100%', height: '2rem', marginTop: '0.4rem' }}></div>
      </div>
   );
}