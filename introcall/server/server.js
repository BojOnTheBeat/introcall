import timekit from 'timekit-sdk';

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
        'user.updateProfile': function(profile, validate) {
            var currentUser = Meteor.userId();
            if (!currentUser) {
                throw new Meteor.Error("not-logged-in",
                    "You're not logged-in.");
            }
            UserProfile.update({
                userId: currentUser
            }, {
                $set: profile
            }, {
                multi: false,
                upsert: true,
                validate: validate
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

            timekit.setUser(data.email, data.token);
            timekit.accountSync().then(function(resp) {
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
            });
        },

        'timekit.calendarList': function(data) {
            var currentUser = Meteor.userId();
            if (!currentUser) {
                throw new Meteor.Error("not-logged-in",
                    "You're not logged-in.");
            }

            var p = UserProfile.findOne({userId: currentUser});

            timekit.setUser(p.timekitApiEmail, p.timekitApiToken);

            timekit.getCalendars().then(function(resp) {
                UserProfile.update({
                    userId: currentUser
                }, {
                    $set: {
                        timekitCalendars: resp.data
                    }
                }, {
                    multi: false,
                }, function(error, result){
                    console.log(error);
                    console.log(result);
                });
            })
        }

    });
});