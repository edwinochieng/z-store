import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        
      };
    }
}
  
  
declare module "next-auth/jwt" {
    interface JWT {
      id: string;
     
    }
  }
  
declare module "next-auth" {
    interface User {
      id: string;
    }
  }