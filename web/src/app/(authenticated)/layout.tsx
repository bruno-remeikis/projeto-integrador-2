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
import { BsBookmark } from 'react-icons/bs';
// Components
import HomeMap from '@/components/HomeMap/HomeMap';
import Evento from '../../components/Evento/Evento';
import { CriarEventoModal } from '@/components/CriarEventoModal';
import { Auth } from '@/components/Auth';
import { Modal } from '@/components/Modal';
import { useState } from 'react';
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
	//const eventos = [...Array(30)];
	const eventos = [...Array(0)];

	const [novoEventoModalVisible, setNovoEventoModalVisible] = useState<boolean>(false);

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

							<li><Link href='/usuario/1'>
								<AiOutlineUser />
								<span>Seu perfil</span>
							</Link></li>

							<li><Link href='/'>
								<BsBookmark />
								<span>Eventos Salvos</span>
							</Link></li>
						</ul>

						<div>
							<span>Bruno Remeiki</span>
							<span>brunocoutinhoremeikis@gmail.com</span>
							<Link type="button" href='/login'>Sair</Link>
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
							{eventos.length ? (
								// Eventos
								<div className={styles.eventos}>
									{eventos.map((e, i) =>
										<Evento
											key={i}
											evento={e}
											displayIcons={false}
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
