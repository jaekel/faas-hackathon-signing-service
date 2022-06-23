/* generateKeys
 *
 * This script creates a keypair for the Sign and Verify FaaS functions.
 * The keypair is intended for signing HMACs and creating signature records.
 */

let crypto = require('crypto');
let fs = require('fs');
const path = require('path');
 
function generateKeyFiles() {
	// use the crypto package to create a key pair
	const keyPair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem',
			cipher: 'aes-256-cbc',
			passphrase: ''
		}
	});

	// writing out the key files
	fs.writeFileSync("public_key.pem", keyPair.publicKey);
	fs.writeFileSync("private_key.pem", keyPair.privateKey);
}

generateKeyFiles();
