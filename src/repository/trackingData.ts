import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrackingData = async (messageId: string, userAgent: string, ipAddress: string) => {
    try {
        const trackingData = await prisma.trackingData.create({
            data: {
                messageId: messageId,
                userAgent: userAgent,
                ipAddress: ipAddress,
            },
        });

        return trackingData;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
