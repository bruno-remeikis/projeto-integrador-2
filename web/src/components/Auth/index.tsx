'use client';

import { user } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthProps = {
   children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) =>
{
   const router = useRouter();

   const [authorized, setAuthorized] = useState<boolean>(false);

   useEffect(() =>
   {
      setAuthorized(!!user);

      if(!user)
         router.push('/login');
   },
   []);

   return <>
      { authorized && children }
   </>

}