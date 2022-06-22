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
    const payload = hmac + ':' + isoDate + ':' + userName;
    return payload;
}

exports.handler = async function (event, contect, callback) {
    const hmac = event.hmac;
    const result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }
    const payload = generatePayload(hmac)
    return "Payload generated:" + payload;
    // signPayload(payload)
};
