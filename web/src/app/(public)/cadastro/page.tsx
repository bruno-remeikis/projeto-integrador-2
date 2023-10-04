'use client';

import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import styles from './page.module.css';
import layoutStyles from '../layout.module.css';

interface PassCheckStyles {
   minCaracters: string;
   letters: string;
   numbers: string;
   simbols: string;
};

export default function LoginPage()
{
   const createEmptyCheckStyles = () => ({
      minCaracters: '',
      letters: '',
      numbers: '',
      simbols: '',
   });

   const [pass, setPass] = useState<string>('');
   const [passCheckStyles, setPassCheckStyles] = useState<PassCheckStyles>(createEmptyCheckStyles());

	function handleSubmit(e: FormEvent<HTMLFormElement>)
	{
		e.preventDefault();
		alert('Submit');
	}

   function onPassChange(e: ChangeEvent<HTMLInputElement>)
   {
      const pass = e.target.value;
      setPass(pass);

      /*
      let containsLower = false;
      let containsUpper = false;

      for(let i = 0; i < pass.length; i++) {
         const cc = pass.charCodeAt(i);
         alert(cc);
         if(cc >= 97 && cc <= 122)
            setPassContainsLower(true);

         if(cc >= 65 && cc <= 90)
            setPassContainsUpper(true);
      }
      */
   }

   useEffect(() =>
   {
      if(!pass) {
         setPassCheckStyles(createEmptyCheckStyles());
         return;
      }

      const getStyles = (bool: boolean) =>
         bool ? styles.validPass : styles.invalidPass;

      setPassCheckStyles({
         minCaracters: getStyles(pass.length >= 8),
         letters: getStyles(/[a-z]/.test(pass) && /[A-Z]/.test(pass)),
         numbers: getStyles(/[0-9]/.test(pass)),
         simbols: getStyles(/[!@#$%&*-_+.~:?\[\]]/.test(pass)),
      });
   },
   [pass]);

	return (
		<main>
			<form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" />
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Senha" value={pass} onChange={onPassChange} />
            <ul className={styles.passRequirements}>
               <li className={passCheckStyles.minCaracters}>8 caracteres</li>
               <li className={passCheckStyles.letters}>Letras maiúsculas e minúsculas</li>
               <li className={passCheckStyles.numbers}>1 número</li>
               <li className={passCheckStyles.simbols}>1 símbolo especial</li>
            </ul>
            <input type="password" placeholder="Confirme sua senha" />
				<div className={styles.formFooter}>
					<div className={styles.boxForgotPass}>
						<span>Esqueceu sua senha?&#160;</span>
						<Link href="" className={layoutStyles.highlightText}>Clique aqui</Link>
					</div>
					<button type="submit" className={layoutStyles.highlightButton}>Criar conta</button>
				</div>
			</form>

			<div style={{ display: 'flex', marginTop: '1rem' }}>
				<span>Já possui uma conta?&#160;</span>
				<Link href="/login" className={layoutStyles.highlightText}>Faça Login.</Link>
			</div>
		</main>
	)
}