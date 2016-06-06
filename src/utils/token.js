import  jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    //app/collections/models
    var u = {
        email: user.email,
        _id: user.id.toString(),
    };
    return jwt.sign(u, process.env.JWT_SECRET, {
        //expiresIn: 60 * 60 * 24 // expires in 24 hours
        expiresIn: 1 // For testing
    });
};
