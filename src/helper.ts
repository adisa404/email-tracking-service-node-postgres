export const isValidRFC822MessageId = (messageId: string): boolean => {
    const messageIdRegex = /^<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>$/;
    return messageIdRegex.test(messageId);
};

export const generateTrackingUrl = (messageId: string, host: string | undefined): string => {
    return `${host}/pixel?messageId=${messageId}`;
};
