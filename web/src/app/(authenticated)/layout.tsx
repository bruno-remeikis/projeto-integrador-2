'use client';

// Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// Styles
import '../globals.css';
import styles from './layout.module.css';
// Icons
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BsBookmark, BsDoorOpen } from 'react-icons/bs';
// Components
import HomeMap from '@/components/HomeMap/HomeMap';
import Evento from '../../components/Evento';
import { CriarEventoModal } from '@/components/CriarEventoModal';
import { Auth } from '@/components/Auth';
import { Modal } from '@/components/Modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TUsuario } from '@/models/Usuario';
import { TEvento } from '@/models/Evento';
import { api } from '@/services/api';
import { AxiosRequestConfig } from 'axios';
import { user } from '@/services/UserService';
//import { Evento2 } from '../../components/Evento2';

const inter = Inter({ subsets: ['latin'] });

/*export const metadata: Metadata = {
  title: 'UrSport',
  description: 'Sua Rede Social Esportiva.',
};*/

export default function AuthenticatedLayout({
	children
}: {
	children: React.ReactNode
})
{
	const router = useRouter();

	const [novoEventoModalVisible, setNovoEventoModalVisible] = useState<boolean>(false);
	const [meusEventos, setMeusEventos] = useState<TEvento[]>([]);

	function handleLogout() {
		localStorage.removeItem('user');
		router.push('/login');
	}

	useEffect(() =>
	{
		const config: AxiosRequestConfig = { headers: { 'user': user.id } };

		api.get(`/evento/eventosParticipacaoUsuario/${user.id}`, config)
			.then(res => setMeusEventos(res.data));
	}, []);

	return (
		<Auth>
			<html lang="pt-BR">
				<body className={`${inter.className} ${styles.body}`}>

					<CriarEventoModal
						isOpen={novoEventoModalVisible}
						setIsOpen={setNovoEventoModalVisible}
					/>

					<aside className={styles.aside}>
						<Link href='/' className={styles.logo}>
							<h1>UrSport</h1>
						</Link>

						<ul className={styles.mainMenu}>
							<li><Link href='/'>
								<AiOutlineHome />
								<span>Página Inicial</span>
							</Link></li>

							<li><Link href={`/usuario/${user.id}`}>
								<AiOutlineUser />
								<span>Seu perfil</span>
							</Link></li>

							<li><Link href='/'>
								<BsBookmark />
								<span>Eventos Salvos</span>
							</Link></li>
						</ul>

						<div className={styles.personalData}>
							<span>{ user.nome }</span>
							<button type="button" onClick={handleLogout} title="Sair">
								<BsDoorOpen />
							</button>
						</div>
					</aside>

					<main className={styles.main}>
						{ children }
					</main>

					<div className={styles.eventsAside}>
						
						<HomeMap />
						
						<div className={styles.proxEventos}>
							<h2 className={styles.eventsTitle}>Seus próximos eventos</h2>
						
							{/* Seus Eventos */}
							{meusEventos.length ? (
								// Eventos
								<div className={styles.eventos}>
									{meusEventos.map((e, i) =>
										<Evento
											key={i}
											evento={e}
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

							<button type="button"
								className={styles.btnNovoEvento}
								onClick={() => setNovoEventoModalVisible(true)}
							>Criar novo evento</button>
						</div>
					</div>
				</body>
			</html>
		</Auth>
	);
}
