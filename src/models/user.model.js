import thinky from '../config/db.js';

const type = thinky.type;
const r = thinky.r;

var User = thinky.createModel('User', {
    id: type.string(),
    name: type.string(),
    email: type.string(),
    password: type.string(),
    createdAt: type.date().default(new Date())
});

User.ensureIndex('createdAt');

export default User;
