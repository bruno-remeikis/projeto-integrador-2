import styles from './styles.module.css';

export const CardUsuario = () =>
{
   return (
      <div className={styles.card}>
         <div className={styles.userImage}></div>
         <span>Card Usuario</span>
      </div>
   );
}