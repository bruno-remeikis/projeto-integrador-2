'use client';

import Link from "next/link";
import { FormEvent } from "react";

export default function LoginPage()
{
	function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();
		alert('Submit');
	}

	return (
		<main>
			<h2>Entrar</h2>

			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Email" />
				<input type="password" placeholder="Senha" />
				<button type="submit">Entrar</button>
			</form>

			<span>Não possui uma conta?</span>
			<Link href="/">Cadastre-se</Link>
		</main>
	)
}