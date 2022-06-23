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

/* hard-coded username for now */
const userName = 'sign.me@ionos.com';
let fs = require('fs');
let crypto = require('crypto');

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

async function signPayload(privateKey, payload) {
    const { privateEncrypt } = await import('node:crypto');
    // const { publicDecrypt } = await import('node:crypto');

    const encryptedSignature = privateEncrypt(
        { key: privateKey, passphrase: '' },
        payload
    );
    console.log('encrypted payload', encryptedSignature);
    return encryptedSignature;
    //const decryptedBuffer = publicDecrypt(publicKey, encryptedContent);
    //const decryptedString = decryptedBuffer.toString();
    //console.log('decrypted payload', decryptedString);
}

exports.handler = async function (event, context, callback) {
    /* verify input parameters */
    const hmac = event.hmac;
    const result = validateHMAC(hmac);
    if (result !== null) {
        return result;
    }

    /* generate signature record */
    const isoDate = new Date().toISOString();
    const payload = generatePayload(hmac, isoDate);

    /* sign the record */
    let privateKey = fs.readFileSync('/home/www/private_key.pem', 'utf8');

    /* Return response */
    return {
        hmac: hmac,
        date: isoDate,
        username: userName,
        signature: encryptedSignature,
        payload: payload,
    };
};
