// DEPS
import express from 'express';
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
app.use(passport.initialize()); // Init passport
passportConfig(passport); // Configure Passport

// CORS MIDDLEWARE
app.use(cors());

// Parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Log requests to console
app.use(morgan('dev'));
// Enable Cors for dev
app.options('*', cors());

// ROUTES
app.use('/api', apiRouter);
app.use('/api/auth', authRouter());

app.listen(port, (err) => {
    console.log('running server on port ' + port);
});
