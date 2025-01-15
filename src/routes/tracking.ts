import express, { Request, Response, Router } from 'express';
import { createMapping } from '../services/trackingMapping.js';

const trackingRoutes: Router = express.Router();

trackingRoutes.post('/generateTrackingUrl', async (req: Request, res: Response) => {
    const { messageId } = req.body;

    if (!messageId) {
        res.json({ status: '400', message: 'messageId is required' });
        return;
    }

    try {
        await createMapping(messageId);

        res.json({ status: '201', message: 'url has been generated' });
    } catch (error) {
        res.json({ status: '500', message: error });
    }
});

export default trackingRoutes;
