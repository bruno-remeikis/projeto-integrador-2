'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthProps = {
   children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) =>
{
   const router = useRouter();

   useEffect(() =>
   {
      if(!localStorage.getItem('user'))
         router.push('/login');
   }, []);

   return (
      <>
         {!localStorage.getItem('user') && null}
         {localStorage.getItem('user') && children}
      </>
   );
}