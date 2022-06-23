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
    const regexExp = /^[a-f0-9=]*$/gi;
    if (!regexExp.test(signature)) {
        return 'Invalid input string';
    }
    return null;
}

exports.handler = async function (event, context, callback) {
    /* verify input parameters */
    const signature = event.signature;
	let hmac = "<tbd>";
	let isoDate = "<tbd>";
	let username = "<tbd>";

    /* decode signature from Base64 to Buffer */

	/* decrypt buffer using public key */

	/* decoding failed? -> return error and exit */

	/* split payload into hmac, date and username */

    /* Return response */
    return {
		singatureValid: true,
		signaturePayload: {
        	hmac: hmac,
        	date: isoDate,
        	username: userName
		}
    };
};
