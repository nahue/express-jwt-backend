import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/main';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const authRouter = express.Router();

const nocache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

const router = () => {
    authRouter.route('/authenticate')
        .post((req, res) => {
            if (!req.body.email || !req.body.password) {
                return res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                User.filter({email: req.body.email}).limit(1).run().then((result) => {
                    if (result.length === 0) {
                        return res.json({success:false, message: 'Authentication failed. User does not exist.'});
                    }
                    const user = result[0];
                    // Compare password
                    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                        if (isMatch && !err) {
                            // if match create token
                            var token = jwt.sign({
                                email: req.body.email,
                                password: req.body.password
                            }, config.secret, {
                                expiresIn: 10080 // one week in seconds
                            });
                            res.json({success:true, token: 'JWT ' + token, user});
                        } else {
                            res.json({success:false, message: 'Authentication failed. Password did not match'});
                        }
                    });
                });
            }
        });

    authRouter.route('/register')
        .post((req, res) => {
            if (!req.body.email || !req.body.password) {
                res.json({
                    success: true,
                    message: 'Please enter an email and password to register.'
                });
            } else {
                var newUser = new User({
                    email: req.body.email
                });

                bcrypt.genSalt(10, (err, salt)  => {
                    if (err) {
                        console.log(err);
                    }
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Setting password...', hash);
                        newUser.password = hash;

                        // Save the user
                        newUser.save().then((result) => {
                            res.json({
                                success: true,
                                message: 'Succesfully created new user',
                                user: newUser,
                                result: result
                            });
                        });
                    });
                });

            }
        });
    return authRouter;
};

module.exports = router;
