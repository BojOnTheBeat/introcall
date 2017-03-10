
Meteor.startup(() => {
	console.log('Introcall Server Started.');
	
	Meteor.publish('consultants.public', function() {
		return ConsultantProfiles.find();
	})
});