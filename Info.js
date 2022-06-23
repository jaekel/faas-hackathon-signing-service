/* Info.js
 *
 * Implementation of info endpoint to provide the public keu.
 *
 * This code requires the presence of a public key for signing
 * in the same directory. The filenam should be "public_key.pem".
 */

/*
 * Output:
 *   {
 *	   "publicKey": "<public key in PEM format>"
 *   }
 */

/* import required modules */
const fs = require('fs');

exports.handler = async function (event, context, callback) {

    const publicKey = fs.readFileSync('public_key.pem', 'utf8');

    return {
		publicKey: publicKey
    };
};
