import { useEventos } from "@/context/EventosContext";
import { api } from "@/services/api";
import { useEffect } from "react";

import styles from './MeusEventos.module.css';
import { configWithUser, user } from "@/services/UserService";
import Evento from "@/components/Evento";

export function MeusEventos()
{
	const { addEventoFeed, meusEventos, setMeusEventos, removerMeuEvento } = useEventos();

   useEffect(() =>
	{
		api.get(`/evento/eventosParticipacaoUsuario/${user?.id}`, configWithUser)
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
								if(e.qtdPresencas !== undefined)
									e.qtdPresencas--;
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