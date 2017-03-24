import 'timezones.json';
const VALIDTIMEZONES = require('timezones.json');

UserProfile = new Mongo.Collection('UserProfile');
Keywords = new Mongo.Collection('Keywords');

Keywords.schema = new SimpleSchema({
    word: {
        type: String,
        min: 2,
        max: 15,
        index:true,
        unique: true
    }
})

Keywords.attachSchema(Keywords.schema);

UserProfile.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },

    keywords: {
        type: [String],
        minCount: 1
    },

    name: { // Split into first and last names?
        type: String,
        min: 4

    },

    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email

    },

    currentLocation: {
        type: String,
        max: 300
    },

    timezone: {
        type: Object,
        allowedValues: VALIDTIMEZONES,
        optional: true
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