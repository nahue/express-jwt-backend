import thinky from '../config/db.js';
let type = thinky.type;

var Photo = thinky.createModel('Photo', {
    id: type.string(),
    title: type.string(),
    likes: type.number(),
    url: type.string(),
    createdAt: type.date().default(new Date())
});

Photo.ensureIndex('createdAt');

module.exports = Photo;
