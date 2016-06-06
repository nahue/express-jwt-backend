// DEPS
import 'babel-polyfill';
import express from 'express';
import expressJwt from 'express-jwt';
// var expressListRoutes   = require('express-list-routes');
import apiRouter from './routes/api.routes.js';
import authRouter from './routes/auth.routes.js';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import passportConfig from './config/passport';
// APP
const port = process.env.PORT || 5000;
const app = express();

// MIDDLEWARE
app.use(express.static('public'));
//app.use(passport.initialize()); // Init passport
passportConfig(passport); // Configure Passport
// CORS MIDDLEWARE
app.use(cors());
app.use(expressJwt({secret: process.env.JWT_SECRET}).unless({
    path: [
        '/api/auth/authenticate',
        '/api/auth/register'
    ]
}));

// Parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Log requests to console
app.use(morgan('dev'));
// Enable Cors for dev
app.options('*', cors());

const config  = require('./config');
const models = require('./schema')(config);

const apiRoutes = apiRouter(models);
// ROUTES
app.use('/api/auth', authRouter(models));
app.use('/api', apiRoutes);
//app.use('/api/auth', authRouter());

// expressListRoutes({ prefix: '/api' }, 'API:', apiRoutes );


app.listen(port, (err) => {
    console.log('running server on port ' + port);
});
