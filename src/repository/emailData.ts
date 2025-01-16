import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const prisma = new PrismaClient();

export const getEmail = async (messageId: string) => {
    try {
        const emailData = await prisma.emailData.findFirst({
            where: {
                messageId,
            },
        });

        return emailData;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export const createEmailData = async (
    messageId: string,
    sender: string,
    receiver: string,
    subject: string,
    text: string
) => {
    try {
        const emailData = await prisma.emailData.create({
            data: {
                messageId: messageId,
                sender: sender,
                receiver: receiver,
                subject: subject,
                text: text,
            },
        });

        return emailData;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export const incrementHits = async (messageId: string) => {
    try {
        const emailData = await prisma.emailData.update({
            where: {
                messageId: messageId,
            },
            data: {
                hits: {
                    increment: 1,
                },
            },
        });

        return emailData;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
