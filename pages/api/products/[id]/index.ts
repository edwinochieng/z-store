import { prisma } from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Products } from '..'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Products | null>
) {
  
    const data = await prisma.product.findUnique({where: {id: req.query.id }})

    res.status(200).json(data)

}
