import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const db_accelerate = new PrismaClient().$extends(withAccelerate());
