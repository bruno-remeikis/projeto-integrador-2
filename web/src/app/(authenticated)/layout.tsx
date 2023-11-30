'use client';

// Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// Styles
import '../globals.css';
import styles from './layout.module.css';
// Icons
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { BsBookmark, BsDoorOpen } from 'react-icons/bs';
// Components
import HomeMap from '@/components/HomeMap/HomeMap';
import Evento from '../../components/Evento';
import { ModalCriarEvento } from '@/components/ModalCriarEvento';
import { Auth } from '@/components/Auth';
import { Modal } from '@/components/Modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TUsuario } from '@/models/Usuario';
import { TEvento } from '@/models/Evento';
import { api } from '@/services/api';
import { AxiosRequestConfig } from 'axios';
import { user } from '@/services/UserService';
import { EventosProvider, useEventos } from '@/context/EventosContext';
import { CounterProvider, useCounter } from '@/context/Counter';
import { MeusEventos } from './MeusEventos';
import { FiSearch } from 'react-icons/fi';
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

	function handleLogout() {
		localStorage.removeItem('user');
		router.push('/login');
	}

	return (
		<html lang="pt-BR">
			{/*<head>
				<title>UrSport</title>
			</head>*/}
			<body className={`${inter.className} ${styles.body}`}>
				<Auth>
					<EventosProvider>

						<ModalCriarEvento
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

								<li><Link href={`/usuario/${user?.id}`}>
									<AiOutlineUser />
									<span>Seu perfil</span>
								</Link></li>

								{/*<li><Link href='/'>
									<BsBookmark />
									<span>Eventos Salvos</span>
								</Link></li>*/}

								<li><Link href="/pesquisar">
									<AiOutlineSearch />
									<span>Pesquisar</span>
								</Link></li>
							</ul>

							<div className={styles.personalData}>
								<Link href={`/usuario/${user?.id}`}>{ user?.nome }</Link>
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
							
								<MeusEventos />

								<button type="button"
									className={styles.btnNovoEvento}
									onClick={() => setNovoEventoModalVisible(true)}
								>Criar novo evento</button>
							</div>
						</div>

					</EventosProvider>
				</Auth>
			</body>
		</html>
	);
}
