async function generateKeys() {
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
    
    const encryptedContent = privateEncrypt({key: privateKey, passphrase: ''}, 'Hallo');
    console.log(encryptedContent);
    const decryptedBuffer = publicDecrypt(publicKey, encryptedContent);
    const decryptedString = decryptedBuffer.toString();
    console.log(decryptedString);
    });
}

generateKeys();

// let crypto = require('crypto');
// let fs = require('fs');
// const path = require('path');
 
// // Generating key files
// function generateKeyFiles() {
 
//     const keyPair = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 520,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem'
//         },
//         privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//         cipher: 'aes-256-cbc',
//         passphrase: ''
//         }
//     });
      
//     // Creating public and private key file
//     fs.writeFileSync("public_key", keyPair.publicKey);
//     fs.writeFileSync("private_key", keyPair.privateKey);
// }
 
// // Generate keys
// generateKeyFiles();
 
// // Reading private key file
// let PRIVKEY = fs.readFileSync(path.join(__dirname,
//                           'private_key'), 'utf8');
 
// // Reading public key file
// let PUBKEY = fs.readFileSync(path.join(__dirname,
//                           'public_key'), 'utf8');
 
// // Defining my msg
// myMSG = "GeeksforGeeks!";
// console.log("Original msg is : "+myMSG);
 
// // RSA PRIVATE ENCRYPT -> PUBLIC DECRYPT
// function privENC_pubDEC(originMSG){
 
//   // Encrypting msg with privateEncrypt method
//  encmsg = crypto.privateEncrypt(PRIVKEY,
//                Buffer.from(originMSG, 'utf8') )
// .toString('base64');
 
//  // Decrypting msg with publicDecrypt method
//  msg = crypto.publicDecrypt(PUBKEY,
//               Buffer.from(encmsg, 'base64'));
 
//  console.log();
 
//  // Prints encrypted msg
//  console.log("Encrypted with private key: "
//                       + encmsg);
 
//  console.log();
 
//  // Prints decrypted msg
//  console.log("Decrypted with public key: "
//                      + msg.toString());
// }
 
// // Calling privENC_pubDEC() method
// privENC_pubDEC(myMSG);

