import express, { Request, Response, Router } from 'express';
import { createMapping } from '../repository/trackingMapping.js';
import { isValidRFC822MessageId, generateTrackingUrl } from '../helper.js';
import { createTrackingData } from '../repository/trackingData.js';
import { incrementHits, getEmail } from '../repository/emailData.js';

const HOST = process.env.HOST;

const trackingRoutes: Router = express.Router();

trackingRoutes.post('/generateTrackingUrl', async (req: Request, res: Response) => {
    const { messageId } = req.body;

    if (!messageId) {
        res.status(400).json({ message: 'messageId is required' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.status(400).json({ message: 'Invalid messageId format' });
        return;
    }

    const trackingUrl: string = generateTrackingUrl(messageId, HOST);

    try {
        await createMapping(messageId, trackingUrl);

        res.status(201).json({ message: 'url has been generated' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

trackingRoutes.get('/pixel', async (req: Request, res: Response) => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
    const messageId = req.query.messageId as string;

    if (!messageId) {
        res.json(400).json({ message: 'bad request' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.json(400).json({ message: 'bad request' });
        return;
    }

    try {
        await createTrackingData(messageId, userAgent, ipAddress);
        await incrementHits(messageId);

        res.status(200).json({ message: 'sucess' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

trackingRoutes.get('/hits', async (req: Request, res: Response) => {
    const messageId = req.query.messageId as string;

    if (!messageId) {
        res.status(400).json({ message: 'MessageId not provided' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.status(400).json({ message: 'MessageId format is invalid' });
        return;
    }

    try {
        const email = await getEmail(messageId);

        if (!email) {
            res.status(404).json({ message: `Email for messageId: ${messageId} not found` });
            return;
        }

        res.status(200).json({
            data: {
                hits: email.hits,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default trackingRoutes;
