module.exports = (r, models) => {

    const {User} = models;

    return {

        find: function(id) {
            const user = User.get(id);
            return user;
        },

        getByEmail: function(email) {
            const user = User.filter({email}).limit(1).run();
            return user;
        },

        create: function(params) {

            const {email} = params;

            const newUser = new User({email});
            return newUser.save();
        },

    }
}
