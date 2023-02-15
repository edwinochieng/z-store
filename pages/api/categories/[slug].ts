import { prisma } from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Products } from '../products'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Products[]>
) {
    
    const data = await prisma.product.findMany({where: { category : req.query.slug }})

    res.status(200).json(data)

}
