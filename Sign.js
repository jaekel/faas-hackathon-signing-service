/* Sign.js
 *
 * Implementation of hmac signing as a FaaS service on the cm4all
 * FaaS platform.
 *
 * This code requires the presence of a secret key for signing
 * in the same directory. The filenam should be "private_key.pem".
 */

/* Input:
 *   {
 *     "hmac": "<sha256 hash-based message authentication code>"
 *   }
 *
 * Output:
 *   {
 *     "hmac": "<sha256 hash-based message authentication code>"
 *     "date": "2022-06-23T10:21:43.806Z"
 *     "username": "sign.me@ionos.com",
 *     "signature": "<base64 encoded signature record>"
 *   }
 */

/* import required modules */
const fs = require('fs');
const crypto = require('crypto');

/* hard-coded username for now */
const userName = 'sign.me@ionos.com';

function validateHMAC(hmac) {
    if (hmac == null) {
        return 'HMAC parameter is missing.';
    }
    const regexExp = /^[a-f0-9]{64}$/gi;
    if (!regexExp.test(hmac)) {
        return 'Invalid input string';
    }
    return null;
}

function generatePayload(hmac, isoDate) {
    const payload = hmac + '|' + isoDate + '|' + userName;
    return payload;
}

function signPayload(privateKey, payload) {
    const buff = Buffer.from(payload, 'utf-8');

    const encryptedSignature = crypto.privateEncrypt(
        { key: privateKey, passphrase: '' },
        buff
    );

    console.log('encrypted payload', encryptedSignature);
    return encryptedSignature.toString('base64');
}

exports.handler = async function (event, context, callback) {
    /* verify input parameters */
    const hmac = event.hmac;
    const validationResult = validateHMAC(hmac);
    if (validationResult !== null) {
        return result;
    }

    /* generate signature record */
    const isoDate = new Date().toISOString();
    const payload = generatePayload(hmac, isoDate);

    /* sign (encrypt) the record */
    const privateKey = fs.readFileSync('private_key.pem', 'utf8');
    const signature = signPayload(privateKey, payload);

    /* Return response */
    return {
        hmac: hmac,
        date: isoDate,
        username: userName,
        signature: signature,
    };
};
