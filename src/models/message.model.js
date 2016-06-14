module.exports = (r, models) => {
    const {Message, Photo} = models;
    return {

        getPhoto: function(id) {
            const message = Message.get(id)
            const photo = category.getJoin({photo: true});
            return photo
        },

        getPhotoMessages: function(id) {
            return Photo.getJoin({
                messages: r.desc('createdAt')
            }).filter({id}).limit(1).run().then((photos) => {
                const photo = photos[0];
                return photo.messages;
            });
        },

        getMessagesByPhotoId: function(id) {
            return Message.filter({photoId: id});
        },

        create: function(params) {
            const newMessage = new Message(params);
            return newMessage.save();
        }
    }
}
