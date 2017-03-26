Meteor.startup(() => {
    console.log('Introcall Server Started.');

    //Keywords.insert({word: "sales"});

    Meteor.publish('users.public', function() {
        return UserProfile.find();
    });

    Meteor.publish('keywords.public', function() {
        return Keywords.find();
    });

    Meteor.publish('user.private', function() {
        return UserProfile.find({
            userId: this.userId
        });
    });

    Meteor.publish('messages', function() {
        return Messages.find();
    });

    Meteor.methods({
        'user.updateProfile': function(profile) {
            var currentUser = Meteor.userId();
            if (!currentUser) {
                throw new Meteor.Error("not-logged-in",
                    "You're not logged-in.");
            }
            UserProfile.update({
                userId: currentUser
            }, {
                $set: {
                    name: profile.name,
                    userId: currentUser,
                    currentLocation: profile.currentLocation,
                    timezone: profile.timezone,
                    phoneNumber: profile.phoneNumber,
                    email: profile.email
                }
            }, {
                multi: false,
                upsert: true
            });

        },

        'insertMessage': function(message) {
            var currentUser = Meteor.userId();
            if (!currentUser) {
                throw new Meteor.Error("not-logged-in",
                    "You're not logged-in.");
            }
            message.timestamp = new Date();
            Messages.insert(message);

        },

        'connectTimekit': function(data) {
            var currentUser = Meteor.userId();
            if (!currentUser) {
                throw new Meteor.Error("not-logged-in",
                    "You're not logged-in.");
            }
            
            UserProfile.update({
                userId: currentUser
            }, {
                $set: {
                    timekitApiToken: data.token,
                    timekitApiEmail: data.email
                }
            }, {
                multi: false,
                upsert: false
            });

        }
    });
});