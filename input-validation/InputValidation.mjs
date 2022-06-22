import {signPayload} from './signPayload.mjs';

function validateHMAC(hmac) {
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        return 'Invalid input string';
    }
    return null;
}

function generatePayload(hmac) {
    const date = new Date();
    const isoDate = date.toISOString();
    const userName = "sign.me@ionos.com"
    const payload = hmac + '|' + isoDate + '|' + userName;
    return payload;
}

// TODO: convert to  FaaS function (exports.handler)
async function handler(event, contect, callback) {
    // TODO: const hmac = event.hmac
    const hmac = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    const result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }
    const payload = generatePayload(hmac);
    console.log("Payload generated: " + payload);
    signPayload(payload);
};

handler()