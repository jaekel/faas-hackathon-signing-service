

function validateHMAC(hmac) {
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        return "Invalid input string"
    }
    if (hmac.length !== 64) {
        return "Invalid input length";
    }
    return null;
}

exports.handler = async function(req) {
    const hmac = req.body.hmac;
    let result = validateHMAC(hmac);
    if (result !== null) {
        return result
    }
    // payload = generatePayload(hmac)
    // signPayload(payload)
    return "valid hmac"
}

