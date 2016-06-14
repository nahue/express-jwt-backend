module.exports = (r, models) => {

    const {User} = models;

    return {

        get: function(id) {
            return User.get(id);
        },

        find: function(id) {
            const user = User.get(id);
            return user;
        },

        getByEmail: function(email) {
            const user = User.filter({email}).limit(1).run();
            return user;
        },

        create: function(params) {

            const {email, password} = params;

            const newUser = new User({email,password});
            return newUser.save();
        },

    }
}
