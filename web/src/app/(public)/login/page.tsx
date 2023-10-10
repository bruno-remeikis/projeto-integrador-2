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
				<input name="email" type="email" placeholder="Email" autoComplete="email" />
				<input name="pass" type="password" placeholder="Senha" autoComplete="pass" />
				<div className={layoutStyles.formFooter}>
					{/*
					<div className={styles.boxForgotPass}>
						<span>Esqueceu sua senha?&#160;</span>
						<Link href="" className={layoutStyles.highlightText}>Clique aqui</Link>
					</div>
					*/}
					<div className={styles.boxForgotPass}>
						<Link href="">Esqueci minha senha</Link>
					</div>
					<button type="submit" className={layoutStyles.highlightButton}>Entrar</button>
				</div>
			</form>

			<div className={layoutStyles.mainRedir}>
				<span>Não possui uma conta?&#160;</span>
				<Link href="/cadastro" className={layoutStyles.highlightText}>Cadastre-se!</Link>
			</div>
		</main>
	)
}