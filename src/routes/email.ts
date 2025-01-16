import express, { Request, Response, Router } from 'express';
import { getEmail, createEmailData } from '../repository/emailData.js';
import { isValidRFC822MessageId, generateTrackingUrl } from '../helper.js';
import { getMapping } from '../repository/trackingMapping.js';
import { sendEmail } from '../service/emailService.js';

const HOST = process.env.HOST;

const emailRoutes: Router = express.Router();

emailRoutes.post('/sendEmail', async (req: Request, res: Response) => {
    const { messageId, sender, receiver, subject, text } = req.body;

    if (!messageId) {
        res.json({ status: '400', message: 'messageId is required' });
        return;
    }

    if (!sender) {
        res.json({ status: '400', message: 'Sender is required' });
        return;
    }

    if (!receiver) {
        res.json({ status: '400', message: 'Receiver is required' });
        return;
    }

    if (!isValidRFC822MessageId(messageId)) {
        res.json({ status: '400', message: 'Invalid messageId format' });
        return;
    }

    try {
        const existing = await getMapping(messageId);
        if (!existing) {
            res.json({ status: '404', message: 'Tracking url for messageId not found' });
            return;
        }

        const existingSentEmail = await getEmail(messageId);
        if (existingSentEmail) {
            res.json({ status: '404', message: 'Email with provided messageId was already sent' });
            return;
        }

        let trackingUrl = generateTrackingUrl(messageId, HOST);
        await sendEmail(sender, receiver, subject, text, trackingUrl, messageId);

        await createEmailData(messageId, sender, receiver, subject, text);

        res.json({ status: '200', message: 'The email has been sent.' });
    } catch (error) {
        res.json({ status: '500', message: error });
    }
});

export default emailRoutes;
