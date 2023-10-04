'use client';

import Link from "next/link";
import { FormEvent } from "react";
import styles from './page.module.css';
import layoutStyles from '../layout.module.css';

export default function LoginPage()
{
	function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();
		alert('Submit');
	}

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Senha" />
				<div className={styles.formFooter}>
					<div className={styles.boxForgotPass}>
						<span>Esqueceu sua senha?&#160;</span>
						<Link href="" className={layoutStyles.highlightText}>Clique aqui</Link>
					</div>
					<button type="submit" className={layoutStyles.highlightButton}>Entrar</button>
				</div>
			</form>

			<div style={{ display: 'flex', marginTop: '1rem' }}>
				<span>Não possui uma conta?&#160;</span>
				<Link href="/cadastro" className={layoutStyles.highlightText}>Crie sua conta!</Link>
			</div>
		</main>
	)
}