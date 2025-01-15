import express, { Request, Response, Router } from 'express';
import { createMapping } from '../repository/trackingMapping.js';
import { isValidRFC822MessageId } from 'src/helper.js';
import { createTrackingData } from '../repository/trackingData.js';

const HOST = process.env.HOST;

const trackingRoutes: Router = express.Router();

trackingRoutes.post('/generateTrackingUrl', async (req: Request, res: Response) => {
    const { messageId } = req.body;

    if (!messageId) {
        res.json({ status: '400', message: 'messageId is required' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.json({ status: '400', message: 'Invalid messageId format' });
        return;
    }

    const trackingUrl: string = generateTrackingUrl(messageId);

    try {
        await createMapping(messageId, trackingUrl);

        res.json({ status: '201', message: 'url has been generated' });
    } catch (error) {
        res.json({ status: '500', message: error });
    }
});

trackingRoutes.get('/pixel', async (req: Request, res: Response) => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const messageId = req.query.messageId as string;

    if (!messageId) {
        res.json({ status: '400', message: 'bad request' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.json({ status: '400', message: 'bad request' });
        return;
    }

    try {
        await createTrackingData(messageId, userAgent, ipAddress);

        res.json({ status: '201' });
    } catch (error) {
        res.json({ status: '500', message: error });
    }
});

export default trackingRoutes;

export const generateTrackingUrl = (messageId: string): string => {
    return `${HOST}/pixel?messageId=${messageId}`;
};
