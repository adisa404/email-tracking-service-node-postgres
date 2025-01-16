import nodemailer from 'nodemailer';

export const sendEmail = async (
    sender: string,
    receiver: string,
    subject: string,
    text: string,
    trackingUrl: string,
    messageId: string
) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS,
            },
            logger: true,
            debug: true,
        });

        let mailOptions = {
            messageId: messageId,
            from: sender,
            to: receiver,
            subject: subject,
            html: `
            <p>${text}</p>
            <img src="${trackingUrl}" alt="Tracking Pixel" style="display:none; width:1px; height:1px;" />
          `,
        };

        let result = await transporter.sendMail(mailOptions);
        console.log(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
