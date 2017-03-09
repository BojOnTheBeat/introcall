import {
	Meteor
} from 'meteor/meteor';

ConsultantProfiles = new Mongo.Collection('consultantprofiles');

ConsultantProfiles.schema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},

	avatarUrl: {
		type: String,
		regEx: SimpleSchema.RegEx.Url, //TODO: need to prevent CSRF attacks on this
		label: "Avatar URL",
		autoValue: function() { return 'http://placehold.it/120x120' }
	},

	tagline: {
		type: String,
		min: 3,
		max: 140
	}
});

ConsultantProfiles.attachSchema(ConsultantProfiles.schema);

Meteor.startup(() => {
	// code to run on server at startup

	Router.route('/', {
		name: 'home',
		template: 'home'
	});

	Router.configure({
		layoutTemplate: 'main'
	});

	Router.route('/register');
	Router.route('/login');

});