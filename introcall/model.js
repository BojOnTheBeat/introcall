ConsultantProfiles = new Mongo.Collection('consultantprofiles');
UserProfile = new Mongo.Collection('UserProfile');

ConsultantProfiles.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },

    avatarUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url, //TODO: need to prevent CSRF attacks on this
        label: "Avatar URL",
        autoValue: function() {
            return 'http://placehold.it/120x120'
        }
    },

    tagline: {
        type: String,
        min: 3,
        max: 140
    }
});

ConsultantProfiles.attachSchema(ConsultantProfiles.schema);

UserProfile.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },

    name: { // Split into first and last names?
        type: String,
        min: 4

    },

    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email

    },

    phoneNumber: {
        type: String, //Is there a better way to validate this?
        min: 10

    },

    avatarUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url, //TODO: need to prevent CSRF attacks on this
        label: "Avatar URL",
        autoValue: function() {
            return 'http://placehold.it/120x120'
        }
    },

});

UserProfile.attachSchema(UserProfile.schema);