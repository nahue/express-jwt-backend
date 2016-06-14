// More info @ https://github.com/siawyoung/thinky-express-example/blob/master/models/User.js

module.exports = (r, models) => {

    const {Photo, User, Message} = models;

    return {

        getPhoto: function(id) {
            return Photo.get(id);
        },

        getAll: function() {
            return Photo.run();
        },

        getPhotos: function() {
            const photos = Photo.getJoin({
                messages: {
                    _apply: function(seq) {
                        return seq.orderBy(r.asc('createdAt'));
                    },
                    user: true
                }
            });
            return photos;
        },

        getPhotoById: async function(id) {
            return Photo.get(id).getJoin({
                messages: {
                    _apply: function(seq) { return seq.count() },
                    _array: false
                },
            }).run();
        },
        getUserPosts: async function(userId) {
            const user  = await User.get(userId)
            const posts = user.getJoin({posts: true})
            return posts
        },

        create: async function(userId, params) {

            const {content} = params

            const user     = await User.get(userId)
            const category = await Category.get(params['category'])
            const post     = new Post({content})
            post.user     = user
            post.category = category
            return post.saveAll()

        }

    }
}
