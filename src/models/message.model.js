module.exports = (r, models) => {
    const {Message, Photo} = models;
    return {

        getPhoto: function(id) {
            const message = Message.get(id)
            const photo = category.getJoin({photo: true});
            return photo
        },

        getPhotoMessages: function(id) {
            return Photo.getJoin({messages:true}).filter({id}).limit(1).run().then((photos) => {
                const photo = photos[0];
                return photo.messages;
            });
        },

        create: function(params) {
            const newMessage = new Message(params)
            return newMessage.save()
        }
    }
}
