'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from './page.module.css';
import layoutStyles from '../layout.module.css';
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

/*interface PassCheckStyles {
   minCaracters: string;
   letters: string;
   numbers: string;
   simbols: string;
};*/

const specialPassChars = '!@#$%&*-_+.~:?';

export default function LoginPage()
{
	const router = useRouter();

	const [nome, setNome] = useState<string>('');
	const [email, setEmail] = useState<string>('');
   const [senha, setSenha] = useState<string>('');
	const [confSenha, setConfSenha] = useState<string>('');

	const verifSenha: Record<string, boolean> = {
		minLength: senha.length >= 8,
      letters: /[a-z]/.test(senha) && /[A-Z]/.test(senha),
      numbers: /[0-9]/.test(senha),
      simbols: /[!@#$%&]/.test(senha),
		onlyValidChars: /[a-zA-Z0-9!@#$%&]/.test(senha), // ! Ver como faz isso
	};

	const getPassReqStyle = (a: boolean): string =>
		a ? styles.validPass : '';

	function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();
		
		for(let key in verifSenha)
			if(!verifSenha[key]) {
				alert('Senha invalida');
				return;
			}

		if(senha !== confSenha) {
			alert('Senhas não conferem');
			return;
		}

		const data = {
			nome, email, senha
		};

		api.post('/usuario', data).then(res =>
		{
			if(res.data)
				router.push('/login');
		})
		.catch(err =>
		{
			alert('Erro ao cadastrar');
			console.error(err);
		});
	}

	return (
		<main>
			<form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nome" autoComplete="name" required value={nome} onChange={e => setNome(e.target.value)} />
				<input name="email" type="email" placeholder="Email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
				<input name="pass" type="password" placeholder="Senha" autoComplete="senha" required value={senha} onChange={e => setSenha(e.target.value)} />
            <ul className={styles.passRequirements}>
               <li className={getPassReqStyle(verifSenha.minLength)}>8 caracteres</li>
               <li className={getPassReqStyle(verifSenha.letters)}>Letras maiúsculas e minúsculas</li>
               <li className={getPassReqStyle(verifSenha.numbers)}>1 número</li>
               <li className={getPassReqStyle(verifSenha.simbols && verifSenha.onlyValidChars)}>1 símbolo especial</li>
            </ul>
            <input name="conf-senha" type="password" placeholder="Confirme sua senha" required value={confSenha} onChange={e => setConfSenha(e.target.value)} />
				<div className={layoutStyles.formFooter}>
					<button type="submit" className={layoutStyles.highlightButton}>Criar conta</button>
				</div>
			</form>

			<div className={layoutStyles.mainRedir}>
				<span>Já possui uma conta?&#160;</span>
				<Link href="/login" className={layoutStyles.highlightText}>Faça Login.</Link>
			</div>
		</main>
	)
}