// Next
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// Styles
import '../globals.css';
import styles from './layout.module.css';
// Icons
import { TfiHome, TfiSearch, TfiDribbble } from "react-icons/tfi";
import { AiOutlineUser } from 'react-icons/ai'
// Components
import HomeMap from '@/components/HomeMap/HomeMap';
import Evento from '../../components/Evento/Evento';

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
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} ${styles.body}`}>

				<aside className={styles.aside}>
					<h1>UrSport</h1>

					<ul>
						<li><Link href=''>
							<AiOutlineUser />
							Meu perfil
						</Link></li>
					</ul>
				</aside>

				<main className={styles.main}>
					{ children }
				</main>

				<div className={styles.eventsAside}>
					<HomeMap />
					<div style={{ padding: '0.6rem' }}>
						<h2>Seus eventos</h2>
						<span>Você ainda não participa de nenhum evento.</span>
						<button type="button">Criar novo evento</button>

						{[...Array(30)].map((e, i) =>
							<Evento
								key={i}
								nome={`Meu Evento ${i + 1}`} 
								data={new Date()}
								descricao="Descrição do meu evento!!!"
								local="Não sei onde é"
								esporte="futebol"
							/>
						)}
					</div>
				</div>
			</body>
		</html>
	);
}
