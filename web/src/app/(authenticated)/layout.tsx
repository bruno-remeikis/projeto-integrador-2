// Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// Styles
import '../globals.css';
import styles from './layout.module.css';
// Icons
import { TfiHome, TfiSearch, TfiDribbble } from "react-icons/tfi";
import { AiOutlineBook, AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs';
// Components
import HomeMap from '@/components/HomeMap/HomeMap';
import Evento from '../../components/Evento/Evento';
//import { Evento2 } from '../../components/Evento2';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UrSport',
  description: 'Sua Rede Social Esportiva.',
};

export default function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const eventos = [...Array(30)];
	//const eventos = [...Array(0)];

	return (
		<html lang="pt-BR">
			<body className={`${inter.className} ${styles.body}`}>

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
						<button type="button">Sair</button>
					</div>
				</aside>

				<main className={styles.main}>
					{ children }
				</main>

				<div className={styles.eventsAside}>
					<HomeMap />
					<div style={{ padding: '0.6rem' }}>
						<h2 className={styles.eventsTitle}>Seus próximos eventos</h2>
					
						{/* Seus Eventos */}
						{eventos.length ? (
							// Eventos
							eventos.map((e, i) =>
								<Evento
									key={i}
									nome={`Meu Evento ${i + 1}`} 
									data={new Date()}
									descricao="Descrição do meu evento!!!"
									local="Não sei onde é"
									esporte="futebol"

									displayIcons={false}
								/>
							)
						) : (
							// Sem eventos
							<div className={styles.noEvents}>
								<span>Você ainda não participa de nenhum evento.</span>
								<button type="button" className={styles.btnNovoEvento}>Criar novo evento</button>
							</div>
						)}
					</div>
				</div>
			</body>
		</html>
	);
}
