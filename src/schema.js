module.exports = config => {
    const thinky = require('thinky')(config.rethinkdb);
    const r = thinky.r;
    const type = thinky.type;

    var User = thinky.createModel('User', {
        id: type.string(),
        name: type.string(),
        email: type.string(),
        password: type.string(),
        createdAt: type.date().default(new Date())
    });

    const Photo = thinky.createModel('Photo', {
        id: type.string(),
        title: type.string(),
        likes: type.number(),
        url: type.string(),
        createdAt: type.date().default(new Date())
    });

    const Message = thinky.createModel('Message', {
        id: type.string(),
        text: type.string(),
        user: type.string(),
        photoId: type.string(),
        createdAt: type.date().default(new Date())
    });

    Message.ensureIndex('createdAt');
    Message.belongsTo(Photo, 'photo', 'photoId', 'id');
    Photo.ensureIndex('createdAt');
    Photo.hasMany(Message, 'messages', 'id', 'photoId');


    const allModels = { Photo, User, Message }

    return {
        Photo: require('./models/photo.model')(r, allModels),
        Message: require('./models/message.model')(r, allModels),
        User: require('./models/user.model')(r, allModels),
    };
}
