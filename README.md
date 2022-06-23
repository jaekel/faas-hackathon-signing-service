# faas-hackathon-signing-service

### 1. Short summary:

This is an implementation of an hmac signing as a FaaS service on the cm4all
FaaS platform. It is intended for the verification of any binary data with the sha256-hmac algorithm method. In order to use this project, we require the user to create an hmac-string for the desired data.

This project is set up with Node.js without any npm dependencies.

### 2. Implementation:

Three faas-function are used: sign, verify and info:

### sign

After receiving the hmac-string through a form submit event, the hmac-string is being validated. Addtionally, an ISO-8601 time stamp is created. Together with the (for now hard coded) user name the payload is created.

An rsa public and private key are generated and add up the desired signature.

The signature is handed out to the user.

### verify

The verify function receives the signature as a parameter.
The signature gets decoded using the public key and returns true in case that signature and user data match. Payload data is returned as a response.

### info

The info returns the public key.

## side note:

This project also includes a script for automatic zip file creation and upload.
