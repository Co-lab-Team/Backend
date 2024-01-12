import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const findUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userID: userId },
    })

    return user
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}