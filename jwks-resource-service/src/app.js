const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { expressjwt: exprjwt } = require('express-jwt');
const jwksClient = require('jwks-rsa');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware use JWT
app.use(exprjwt({
    secret: jwksClient.expressJwtSecret({
        jwksUri: 'http://localhost:3000/.well-known/jwks.json',
        cache: false,
        rateLimit: true,
    }),
    algorithms: ['RS256']
}).unless({ path: ['/'] }));

app.get('/', (req, res) => {
    res.json({
        message: 'Resource Service',
    });
});

app.get('/protected', (req, res) => {
    res.json({
        message: 'Protected Service',
    });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
