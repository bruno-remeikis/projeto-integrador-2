import { Inter } from 'next/font/google';
import '../globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} ${styles.body}`}>

				<h1>UrSport</h1>

				<div className={styles.authContainer}>
					{children}
				</div>
				
			</body>
		</html>
	);
}