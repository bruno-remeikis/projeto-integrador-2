import { useEventos } from "@/context/EventosContext";
import { api } from "@/services/api";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";

import styles from './MeusEventos.module.css';
import { user } from "@/services/UserService";
import Evento from "@/components/Evento";

export function MeusEventos()
{
	const { addEventoFeed, meusEventos, setMeusEventos, removerMeuEvento } = useEventos();

   useEffect(() =>
	{
		const config: AxiosRequestConfig = { headers: { 'user': user?.id } };

			api.get(`/evento/eventosParticipacaoUsuario/${user?.id}`, config)
				.then(res => setMeusEventos(res.data));
	}, []);
   
   return (
		<>
			{meusEventos?.length ? (
				// Eventos
				<div className={styles.eventos}>
					{meusEventos.map((e, i) =>
						<Evento
							key={i}
							evento={e}
							onMarcarPresenca={() => {
								e.presente = false;
								addEventoFeed(e);
								removerMeuEvento(e.id!);
							}}
							displayDescricao={false}
							//displayIcons={false}
						/>
					)}
				</div>
			) : (
				// Sem eventos
				<div className={styles.noEvents}>
					<span>Você ainda não participa de nenhum evento.</span>
				</div>
			)}
		</>
   );
}