const hmac = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

function validateHMAC(hmac) {
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        console.log('Invalid input string');
    }
    if (hmac.length !== 64) {
        console.log('Invalid input length');
    }
    return null;
}

function hmacTest(hmac) {
    let result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }
    // payload = generatePayload(hmac)
    // signPayload(payload)
    console.log('valid hmac');
}

function getDate() {
    const date = new Date();
    console.log('this is the date:', date);
    const isoDate = date.toISOString();
    console.log('this is the iso date:', isoDate);
}

hmacTest(hmac);
getDate();
