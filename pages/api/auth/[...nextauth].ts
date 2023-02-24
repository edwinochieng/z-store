import NextAuth, { AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/client";
import bcrypt from 'bcrypt'


export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        type:'credentials',
        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: 'password', type: 'password' },
        },

        async authorize(credentials){
          
          const user = await prisma.user.findUnique({where: {email: credentials?.email}})

          if(user && bcrypt.compareSync(credentials?.password!, user.password) ){
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            }
          }
          throw new Error("Invalid email or password")
        }
      
      })
    ],
    callbacks: {
      async jwt({token,user}){
        if(user) token.id = user.id;
        return token;
}, 
     async session ({session,token}){
      if(token) session.user.id = token.id;
      return session;
     }
    }
      
  }
  export default NextAuth(authOptions)