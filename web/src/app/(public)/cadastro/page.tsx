'use client';

import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import styles from './page.module.css';
import layoutStyles from '../layout.module.css';
import { Metadata } from "next";

/*interface PassCheckStyles {
   minCaracters: string;
   letters: string;
   numbers: string;
   simbols: string;
};*/

const specialPassChars = '!@#$%&*-_+.~:?';

export default function LoginPage()
{
   const [pass, setPass] = useState<string>('');

   const teste = pass.length > 0 ? {
      minCaracters: pass.length >= 8 ? styles.validPass : '',
      letters: /[a-z]/.test(pass) && /[A-Z]/.test(pass) ? styles.validPass : '',
      numbers: /[0-9]/.test(pass) ? styles.validPass : '',
      simbols: /[!@#$%&]/.test(pass) ? styles.validPass : '',
   } : undefined;

	function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();
		alert('Submit');
	}

	return (
		<main>
			<form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nome" autoComplete="name" />
				<input name="email" type="email" placeholder="Email" autoComplete="email" />
				<input name="pass" type="password" placeholder="Senha" autoComplete="pass" value={pass} onChange={e => setPass(e.target.value)} />
            <ul className={styles.passRequirements}>
               <li className={teste?.minCaracters}>8 caracteres</li>
               <li className={teste?.letters}>Letras maiúsculas e minúsculas</li>
               <li className={teste?.numbers}>1 número</li>
               <li className={teste?.simbols}>1 símbolo especial</li>
            </ul>
            <input name="conf-pass" type="password" placeholder="Confirme sua senha" />
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