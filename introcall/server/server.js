Meteor.startup(() => {
    console.log('Introcall Server Started.');

    Meteor.publish('consultants.public', function() {
        return ConsultantProfiles.find();
    });


    Meteor.methods({
    	'user.updateProfile' : function(profile){
    		console.log(profile);

    		var currentUser = Meteor.userId();
    		if(!currentUser){
        		throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    		}
    		UserProfile.update({userId: currentUser}, 
    			{$set: 
    				{name: profile.name,
    				 userId: currentUser,
    				 currentLocation: profile.currentLocation,
    				 timezone: profile.timezone,
    				 phoneNumber: profile.phoneNumber,
    				 email: profile.email} },
    			{multi: false, upsert: true});

    	},
    });
});