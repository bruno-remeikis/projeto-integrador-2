import Evento from "@/models/Evento";

import styles from './Evento.module.css';

interface EventoProps extends Evento {};

export default function Evento({ nome, data, descricao, local, esporte }: EventoProps)
{
   return (
      <div className={styles.evento}>
         <span>{ nome }</span>
         <span>{ descricao }</span>
      </div>
   );
}