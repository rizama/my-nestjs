const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({
        message: 'Auth Resource',
    });
});

app.get('/login', (req, res) => {
    // Assuming that you do all the login checks (check to database etc)
    // and then only issue a JWT

    const privateFileName = 'private.pem';
    const pathFile = path.join(__dirname, `/certs/${privateFileName}`);
    
    // Read the private key, make sure this .pem is LF formating
    const secret = fs.readFileSync(pathFile);
    console.log(secret);

    /**
     * generate token using private key from private.pem
     * using algorithm: RS256 (RSA)
     * expired in: 1 minutes
     */
    const token = JWT.sign({}, secret, {
        expiresIn: '1min',
        algorithm: 'RS256'
    });

    res.json({
        token,
    });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
