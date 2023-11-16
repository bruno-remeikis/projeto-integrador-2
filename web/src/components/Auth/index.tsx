'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthProps = {
   children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) =>
{
   const router = useRouter();

   const authorized: boolean = (() =>
   {
      const user =
         typeof window !== 'undefined' &&
         !!localStorage.getItem('user');

      if(!user)
         router.push('/login');

      return user;
   })();

   return <>
      { authorized && children }
   </>

}