'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from './page.module.css';
import layoutStyles from '../layout.module.css';
import { signIn } from 'next-auth/react';
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { cookies } from 'next/headers';

export default function LoginPage()
{
	const router = useRouter();
	//const cookieStore = cookies();

	const [email, setEmail] = useState<string>('');
	const [senha, setSenha] = useState<string>('');

	async function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();

		const data = {
			email,
			senha
		};

		api.get('/usuario', { params: data }).then(res =>
		{
			if(res.status === 200 && res.data) {
				//localStorage.setItem(localStorages.usuarioLogado, res.data);
				//cookies().set('user', JSON.stringify(data));
				console.log(res);
				localStorage.setItem('user', JSON.stringify(res.data));
				router.push('/');
			}
			else {
				alert('Email ou senha inválidos.');
			}
		})
		.catch(err =>
		{
			console.error(err);
			alert('Erro ao fazer login.');
		});
	}

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<input name="email" type="email" placeholder="Email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
				<input name="pass" type="password" placeholder="Senha" autoComplete="pass" value={senha} onChange={e => setSenha(e.target.value)} />
				<div className={layoutStyles.formFooter}>
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