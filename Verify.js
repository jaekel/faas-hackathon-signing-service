/* Verify.js
 *
 * Implementation of signature record validation as a FaaS service on the
 * cm4all FaaS platform.
 *
 * This code requires the presence of a public key for signing
 * in the same directory. The filenam should be "public_key.pem".
 */

/* Input:
 *   {
 *     "signature": "<base64 encoded signature record>"
 *   }
 *
 * Output:
 *   {
 *	   "signatureValid": true,
 *	   "SignaturePayload":
 *	   {
 *       "hmac": "<sha256 hash-based message authentication code>"
 *       "date": "2022-06-23T10:21:43.806Z"
 *       "username": "sign.me@ionos.com",
 *     }
 *   }
 */

/* import required modules */
const fs = require('fs');
const crypto = require('crypto');

/* hard-coded username for now */
const userName = 'sign.me@ionos.com';

function validateSignatureRecord(signature) {
    if (signature == null) {
        return 'Signature parameter is missing.';
    }
    const regexExp = /^[a-zA-Z0-9=\/\n \+]*$/gi;
    if (!regexExp.test(signature)) {
        return 'Invalid input string';
    }
    return null;
}

exports.handler = async function (event, context, callback) {
    /* verify input parameters */
    const signature = event.signature;
    const validationResult = validateSignatureRecord(signature);
    if (validationResult !== null) {
        return validationResult;
    };


    const publicKey = fs.readFileSync('public_key.pem', 'utf8');
     

    try {
		/* decode signature from Base64 to Buffer & decrypt buffer using public key */
        const decryptedBuffer = crypto.publicDecrypt(publicKey, Buffer.from(signature, 'base64'));
        const decryptedString = decryptedBuffer.toString();

		/* Note: the above line will throw an exception of the signature
		 * isn't valid or has been modified. See catch block for handling
		 * this case. */

		/* split payload into hmac, date and username */
        const data = decryptedString.split('|');
        let hmac = data[0];
        let isoDate = data[1];
        let username = data[2];

		/* Return response */
        return {
            singatureValid: true,
            signaturePayload: {
                hmac: hmac,
                date: isoDate,
                username: username
            }
        };
    } catch (error) {
	    /* decoding failed? -> return error and exit */
        return {
            message: "Wrong signature",
            singatureValid: false,
        };    
    };
};
