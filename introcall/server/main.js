import { Meteor } from 'meteor/meteor';

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
