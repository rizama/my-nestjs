/* eslint-disable prefer-template */
const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');
const path = require('path');

const privateFileName = 'private.pem';
const pathFile = path.join(__dirname, `/src/certs/${privateFileName}`);

// Read the private key, make sure this .pem is LF format
const privateKey = fs.readFileSync(pathFile);
console.log(privateKey);

// Extract and Convert Public Key to JWK using Private Key
// use pattern 'sig' = signature
// rsaPemToJwk(pem, extraKeys, type)
const jwk = rsaPemToJwk(privateKey, { use: 'sig' }, 'public');
console.log(jwk);

// run: node convertPemToJwk.js
// after run: copy the jwk in console to jwks.json in .well-known
