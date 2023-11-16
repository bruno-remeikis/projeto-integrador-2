'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthProps = {
   children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) =>
{
   //const router = useRouter();

   const [authorized, setAuthorized] = useState<boolean>(true);

   useEffect(() =>
   {
      console.log('Teste');
   }, []);

   /*useEffect(() =>
   {
      console.log('AAA');

      if(localStorage.getItem('user'))
         setAuthorized(true);
      else
         router.push('/login');
   }, []);*/

   return (
      <>
         {authorized && children}
      </>
   );
}