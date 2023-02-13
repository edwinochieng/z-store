import { prisma } from '@/prisma/client'
import { products } from '@/utils/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface Products {
    id:string
    name:string
    price:number
    image:string
    category:string
    description:string
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Products[]>
) { 
    
    const data = await prisma.product.findMany()

    res.status(200).json(data)
}
