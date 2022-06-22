function validateHMAC(hmac) {
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        return 'Invalid input string';
    }
    return null;
}

function generatePayload(hmac) {
    const date = new Date();
    console.log('this is the date:', date);
    const isoDate = date.toISOString();
    console.log('this is the iso date:', isoDate);
}

exports.handler = async function (event, contect, callback) {
    const hmac = event.hmac;
    let result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }
    // payload = generatePayload(hmac)
    // signPayload(payload)
    return 'valid hmac';
};
