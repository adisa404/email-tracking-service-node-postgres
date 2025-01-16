import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMapping = async (messageId: string, trackingUrl: string) => {
    try {
        const mapping = await prisma.trackingMapping.create({
            data: {
                messageId: messageId,
                url: trackingUrl,
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

export const getMapping = async (messageId: string) => {
    try {
        const mapping = await prisma.trackingMapping.findFirst({
            where: {
                messageId,
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
