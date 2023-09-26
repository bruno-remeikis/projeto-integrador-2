import '../globals.css';
import styles from './layout.module.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { TfiHome, TfiSearch, TfiDribbble } from "react-icons/tfi";

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

				<header className={styles.mainHeader}>
					<TfiDribbble className={styles.headerIcon} />
					<h1 className={styles.headerTitle}>UrSport</h1>
				</header>

				<div className={styles.mainContainer}>
					{children}
				</div>

				<nav className={styles.mainNavigation}>
					<ul>
						<li>
							<Link href="/">
								<TfiHome />
							</Link>
						</li>
						<li>
							<Link href="/">
								<TfiSearch />
							</Link>
						</li>
						<li>
							<Link href="/">
								<TfiDribbble />
							</Link>
						</li>
					</ul>
				</nav>

			</body>
		</html>
	);
}
