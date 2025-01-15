import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMapping = async (messageId: string) => {
    try {
        const mapping = await prisma.trackingMapping.create({
            data: {
                messageId: messageId,
                url: 'urltest',
            },
        });

        return mapping;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
