//import { authenticate } from "@/services/authService";
import { api } from "@/connection/api";
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Password", type: "password" }
      },
      async authorize(credentials, req)
      {
        console.log('credentials:');
        console.log(credentials);
        console.log('req:');
        console.log(req);

        if(!credentials)
          return null;

        const params = {
          email: credentials.email,
          senha: credentials.senha
        };

        const res = await api.get('/usuario', { params });
        if(res && res.status === 200)
          return res.data;

        return null;

        /*if(typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password)
          if (typeof res !== "undefined") {
            return { ...res.user, apiToken: res.token }
          } else {
            return null
          }
        } else {
          return null
        }*/
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };