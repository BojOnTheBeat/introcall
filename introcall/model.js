import 'timezones.json';
const VALIDTIMEZONES = require('timezones.json');

UserProfile = new Mongo.Collection('UserProfile');
Keywords = new Mongo.Collection('Keywords');
Messages = new Mongo.Collection('messages');

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
        minCount: 1,
        optional: true
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

Messages.schema = new SimpleSchema({
    'to': {
    type: String,
    label: 'The ID of the user this message was sent directly to.',
    regEx: SimpleSchema.RegEx.Id
    },

    'owner': {
    type: String,
    label: 'The ID of the user that created this message.',
    regEx: SimpleSchema.RegEx.Id
    },

    'timestamp': {
    type: Date,
    label: 'The date and time this message was created.',
    },

    'message': {
    type: String,
    label: 'The content of this message.',
    min: 1,
    }
});

Messages.attachSchema( Messages.schema );











