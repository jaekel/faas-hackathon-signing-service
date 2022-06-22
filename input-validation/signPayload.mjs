export async function signPayload(payload) {
    const { generateKeyPair } = await import('node:crypto');
    const { privateEncrypt } = await import('node:crypto');
    const { publicDecrypt } = await import('node:crypto');

    generateKeyPair('rsa', {
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
    }, (err, publicKey, privateKey) => {
    if (err) {
        console.log(err);
    }
    const encryptedContent = privateEncrypt({key: privateKey, passphrase: ''}, payload);
    console.log('encrypted payload', encryptedContent);
    const decryptedBuffer = publicDecrypt(publicKey, encryptedContent);
    const decryptedString = decryptedBuffer.toString();
    console.log('decrypted payload', decryptedString);
    });
};