import { prisma } from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

const saltRounds = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    
   if (req.method !== "POST"){
    return;
   }


   try {

    const {name,email,password} = req.body;

    if(!name || !email || !email.includes('@') || !password || password.trim().length < 6) {
    res.status(422).send({
        message: 'Validation Error'
    })
    return;
   }

    const existingUser = await prisma.user.findUnique({where:{email: email}})

   if(existingUser){
    res.status(422).send({
        message:'User already exists'
    })
    return;
   }

   const newUser = await prisma.user.create({ data: {
    name,
    email,
    password: bcrypt.hashSync(password, saltRounds)
   }});

   res.status(201).send({
    message:'User created!',
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    
   })

   } catch (err) {
    res.status(500).send({message: 'Server error'})
   }
   
}
